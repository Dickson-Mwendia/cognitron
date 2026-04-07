/**
 * Stockfish Web Worker wrapper.
 *
 * NOTE: We do NOT use this file as a compiled worker entrypoint.
 * Instead, the Stockfish WASM engine (stockfish-18-lite-single.js) is placed
 * in /public/stockfish/stockfish.js and loaded directly as a Web Worker via:
 *
 *   new Worker('/stockfish/stockfish.js')
 *
 * This is the recommended approach from the stockfish.js npm package —
 * the bundled JS file auto-detects a Web Worker context and sets up the
 * UCI protocol via onmessage/postMessage.
 *
 * UCI commands are sent with worker.postMessage('command'):
 *   - 'uci'                        → initialise, engine responds with 'uciok'
 *   - 'isready'                    → ping, engine responds with 'readyok'
 *   - 'ucinewgame'                 → reset for new game
 *   - 'setoption name X value Y'   → set engine options (e.g. Skill Level)
 *   - 'position fen <fen>'         → set board position
 *   - 'go depth <d>'               → search to depth d, responds with 'bestmove <move>'
 *   - 'stop'                       → abort current search
 *   - 'quit'                       → terminate engine
 *
 * The useStockfish() hook in ./useStockfish.ts manages the worker lifecycle.
 */

export {}
