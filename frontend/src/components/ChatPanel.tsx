import { useState, useRef, useEffect, type KeyboardEvent, type ChangeEvent } from 'react'

interface Message {
  id: number
  text: string
  type: 'user' | 'bot'
}

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Halo! Ada yang bisa kami bantu? 🐱', type: 'bot' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    const message = input.trim()
    if (!message) return

    const userMessage: Message = { id: Date.now(), text: message, type: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        text: 'Terima kasih! Pesan Anda diterima. Admin Dr. Meow akan membantu Anda. 🐱',
        type: 'bot'
      }
      setMessages(prev => [...prev, response])
    }, 700)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  if (!isOpen) return null

  return (
    <div id="chatPanel" className="fixed right-5 bottom-24 z-40 w-[calc(100%-40px)] sm:w-96 bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden">
      <div className="px-5 py-4 bg-sky-400 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-black">Dr. Meow Chat</p>
            <p className="text-xs text-white/80">Kami siap membantu</p>
          </div>
          <button id="closeChat" type="button" className="text-white/80 hover:text-white text-xl" onClick={onClose}>×</button>
        </div>
      </div>

      <div className="p-5">
        <div id="chatMessages" className="bg-sky-50 rounded-2xl p-4 text-sm text-slate-600">
          {messages.map(msg => (
            <div key={msg.id} className={`mt-3 ${msg.type === 'user' ? 'ml-8 p-3 rounded-2xl bg-sky-400 text-white' : 'mr-8 p-3 rounded-2xl bg-white border border-sky-100'}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex gap-2">
          <input
            id="chatInput"
            type="text"
            placeholder="Tulis pesan..."
            className="dm-input min-w-0 flex-1"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button id="sendChat" type="button" className="px-4 rounded-xl bg-sky-400 text-white font-bold hover:bg-sky-500" onClick={sendMessage}>
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPanel