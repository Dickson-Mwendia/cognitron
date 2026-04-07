'use client'

import { useState } from 'react'
import type { Conversation, Message } from '@/types'
import { Send, MessageSquare } from 'lucide-react'
import { sendMessage } from '@/lib/actions'

interface Props {
  conversations: Conversation[]
  currentUserId?: string
  currentUserName?: string
}

export function ParentMessagesClient({ conversations: initialConversations, currentUserId, currentUserName }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [selectedId, setSelectedId] = useState<string>(initialConversations[0]?.id || '')
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)

  const selectedConversation = conversations.find((c) => c.id === selectedId)

  async function handleSend() {
    if (!newMessage.trim() || !selectedConversation || sending) return

    setSending(true)
    const result = await sendMessage(selectedConversation.coachId, newMessage.trim())

    if (result.success) {
      // Optimistically add message to local state
      const newMsg: Message = {
        id: result.messageId ?? crypto.randomUUID(),
        senderId: currentUserId ?? 'self',
        senderName: currentUserName ?? 'You',
        senderRole: 'parent',
        text: newMessage.trim(),
        timestamp: new Date().toISOString(),
      }

      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversation.id
            ? {
                ...c,
                messages: [...c.messages, newMsg],
                lastMessage: newMsg.text,
                lastMessageAt: newMsg.timestamp,
              }
            : c,
        ),
      )
      setNewMessage('')
    }
    setSending(false)
  }

  const formatTime = (iso: string) => {
    const d = new Date(iso)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    }
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return d.toLocaleDateString('en-GB', { weekday: 'short' })
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  }

  const formatMessageTime = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ' · ' +
      d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden" style={{ height: '600px' }}>
      {/* Left Sidebar — Conversations */}
      <div className="w-[280px] border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-heading text-sm font-bold text-[#0c1b33]">Conversations</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              type="button"
              onClick={() => setSelectedId(conv.id)}
              className={`w-full text-left p-4 border-b border-gray-50 transition-colors ${
                selectedId === conv.id
                  ? 'bg-[#0c1b33]/5 border-l-2 border-l-[#2a9d8f]'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0c1b33] text-sm font-semibold text-white">
                  {conv.coachName.split(' ').slice(1).map((w) => w[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#0c1b33] truncate">{conv.coachName}</p>
                    <span className="text-[10px] text-[#0c1b33]/40 shrink-0 ml-2">
                      {formatTime(conv.lastMessageAt)}
                    </span>
                  </div>
                  <p className="text-xs text-[#0c1b33]/50 truncate mt-0.5">{conv.lastMessage}</p>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e8614d] text-[10px] font-bold text-white shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel — Messages */}
      <div className="flex-1 flex flex-col min-w-0">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0c1b33] text-xs font-semibold text-white">
                {selectedConversation.coachName.split(' ').slice(1).map((w) => w[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0c1b33]">{selectedConversation.coachName}</p>
                <p className="text-xs text-[#0c1b33]/40">Coach</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((msg) => {
                const isParent = msg.senderRole === 'parent'
                return (
                  <div key={msg.id} className={`flex ${isParent ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${isParent ? 'order-2' : ''}`}>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          isParent
                            ? 'bg-[#0c1b33] text-white rounded-br-md'
                            : 'bg-gray-100 text-[#0c1b33] rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                      <p className={`text-[10px] mt-1 ${isParent ? 'text-right' : 'text-left'} text-[#0c1b33]/40`}>
                        {msg.senderName} · {formatMessageTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl border border-gray-200 bg-gray-50 py-2.5 px-4 text-sm text-[#0c1b33] placeholder:text-[#0c1b33]/40 outline-none focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/20 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && newMessage.trim()) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={sending || !newMessage.trim()}
                  className="rounded-xl bg-[#2a9d8f] p-2.5 text-white transition-all hover:bg-[#2a9d8f]/90 active:scale-[0.97] disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <MessageSquare className="w-12 h-12 text-[#0c1b33]/20 mx-auto mb-3" />
              <p className="text-sm text-[#0c1b33]/40">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
