'use client'

import { useRef, useCallback, useEffect } from 'react'

interface StockfishState {
  worker: Worker | null
  ready: boolean
  resolveMove: ((move: string) => void) | null
}

/**
 * React hook that manages a Stockfish WASM Web Worker.
 *
 * The stockfish.js file in /public/stockfish/ is designed to run directly
 * as a Web Worker.  We send UCI commands via postMessage and parse the
 * engine's text output for the bestmove line.
 */
export function useStockfish() {
  const state = useRef<StockfishState>({
    worker: null,
    ready: false,
    resolveMove: null,
  })

  const initWorker = useCallback(() => {
    if (state.current.worker) return

    try {
      const worker = new Worker('/stockfish/stockfish.js')

      worker.onmessage = (e: MessageEvent) => {
        const line = typeof e.data === 'string' ? e.data : ''

        if (line === 'readyok') {
          state.current.ready = true
        }

        // Parse bestmove response
        if (line.startsWith('bestmove')) {
          const move = line.split(' ')[1]
          if (move && state.current.resolveMove) {
            state.current.resolveMove(move)
            state.current.resolveMove = null
          }
        }
      }

      worker.onerror = () => {
        // Silently handle — fallback UI will show
        state.current.ready = false
      }

      state.current.worker = worker

      // Initialize UCI protocol
      worker.postMessage('uci')
      worker.postMessage('isready')
    } catch {
      // Web Workers or WASM not supported
      state.current.ready = false
    }
  }, [])

  // Initialize on mount
  useEffect(() => {
    initWorker()

    return () => {
      if (state.current.worker) {
        state.current.worker.postMessage('quit')
        state.current.worker.terminate()
        state.current.worker = null
        state.current.ready = false
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Ask Stockfish for the best move from a given FEN position.
   * Returns a UCI move string like "e2e4".
   */
  const getBestMove = useCallback(
    (fen: string, skillLevel: number, depth: number): Promise<string> => {
      return new Promise((resolve, reject) => {
        const { worker } = state.current
        if (!worker) {
          reject(new Error('Stockfish not loaded'))
          return
        }

        // Cancel any pending request
        if (state.current.resolveMove) {
          state.current.resolveMove('0000')
          state.current.resolveMove = null
        }

        state.current.resolveMove = resolve

        // Set skill level (0–20) and configure for kid-friendly play
        worker.postMessage('ucinewgame')
        worker.postMessage(`setoption name Skill Level value ${Math.max(0, Math.min(20, skillLevel))}`)
        worker.postMessage('isready')

        // Small delay to ensure options are set before searching
        setTimeout(() => {
          worker.postMessage(`position fen ${fen}`)
          worker.postMessage(`go depth ${depth}`)
        }, 50)

        // Safety timeout — resolve with a null move if engine hangs
        setTimeout(() => {
          if (state.current.resolveMove === resolve) {
            state.current.resolveMove = null
            reject(new Error('Stockfish timed out'))
          }
        }, 30000)
      })
    },
    [],
  )

  /** Stop any current calculation. */
  const stop = useCallback(() => {
    const { worker } = state.current
    if (worker) {
      worker.postMessage('stop')
    }
    if (state.current.resolveMove) {
      state.current.resolveMove('0000')
      state.current.resolveMove = null
    }
  }, [])

  /** Whether the engine is available. */
  const isReady = useCallback(() => state.current.ready, [])

  /** Whether a worker was created (even if still loading). */
  const isLoaded = useCallback(() => state.current.worker !== null, [])

  return { getBestMove, stop, isReady, isLoaded }
}
