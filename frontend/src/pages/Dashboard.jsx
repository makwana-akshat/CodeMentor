import React, { useState, useRef, useEffect } from 'react'
import CodeInput from '../components/CodeInput'
import { dummyAIResponse } from '../utils/dummyData'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowUp, Paperclip, Mic, Loader2, Code, Bug, Wrench } from 'lucide-react'
import ChatMessage from '../components/ChatMessage'

export default function Dashboard() {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [followUp, setFollowUp] = useState('')
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useGSAP(() => {
    if (messages.length > 0 && containerRef.current) {
      const lastMessage = containerRef.current.lastElementChild
      gsap.fromTo(lastMessage, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, { dependencies: [messages], scope: containerRef })

  const handleCodeSubmit = ({ code, language, level }) => {
    setMessages([...messages, { type: 'user', content: code, isCode: true }])
    setIsTyping(true)
    
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'ai', content: dummyAIResponse }])
      setIsTyping(false)
    }, 1500)
  }

  const handleFollowUpSubmit = (e) => {
    e.preventDefault()
    if (!followUp.trim()) return
    
    setMessages([...messages, { type: 'user', content: followUp, isCode: false }])
    setFollowUp('')
    setIsTyping(true)
    
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'ai', content: "Here is more context based on your follow-up question. I can explain further or provide new code examples if needed." }])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full w-full bg-background relative">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto w-full px-4">
          <h1 className="text-3xl font-semibold text-primary-text mb-8">Where should we begin?</h1>
          <div className="w-full relative shadow-2xl rounded-xl">
            <CodeInput onSubmit={handleCodeSubmit} isLoading={isTyping} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button className="flex items-center px-4 py-2 rounded-full border border-border text-sm font-medium text-primary-text hover:bg-[#2A2B32] transition-colors bg-transparent">
              <Code className="mr-2 text-secondary-text" size={16} /> Analyze Complexity
            </button>
            <button className="flex items-center px-4 py-2 rounded-full border border-border text-sm font-medium text-primary-text hover:bg-[#2A2B32] transition-colors bg-transparent">
              <Bug className="mr-2 text-secondary-text" size={16} /> Find Bugs
            </button>
            <button className="flex items-center px-4 py-2 rounded-full border border-border text-sm font-medium text-primary-text hover:bg-[#2A2B32] transition-colors bg-transparent">
              <Wrench className="mr-2 text-secondary-text" size={16} /> Refactor Code
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full w-full">
          <div className="flex-1 overflow-y-auto pt-8 pb-4 scrollbar-thin" ref={containerRef}>
            <div className="max-w-3xl mx-auto w-full px-4 space-y-8">
              {messages.map((msg, index) => (
                <div key={index} className="flex flex-col">
                  {msg.type === 'user' ? (
                    <div className="self-end bg-[#2F2F2F] px-5 py-3.5 rounded-3xl rounded-tr-sm max-w-[85%] text-primary-text shadow-sm">
                      {msg.isCode ? (
                        <pre className="text-sm font-mono whitespace-pre-wrap">{msg.content}</pre>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                  ) : (
                    <div className="self-start w-full">
                      <ChatMessage content={msg.content} />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="self-start text-secondary-text flex items-center space-x-2 mt-4">
                  <Loader2 className="animate-spin" size={20} />
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>

          <div className="mt-auto pt-2 pb-6 w-full">
            <div className="max-w-3xl mx-auto px-4">
              <form onSubmit={handleFollowUpSubmit} className="relative flex items-center bg-[#2F2F2F] rounded-full shadow-md">
                <button type="button" className="pl-4 pr-3 py-3 text-primary-text hover:text-white transition-colors">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  placeholder="Ask anything"
                  className="flex-1 bg-transparent border-none focus:outline-none text-primary-text py-3.5 text-base placeholder-secondary-text"
                />
                <div className="pr-2 pl-3 flex items-center">
                  {followUp.trim() ? (
                    <button
                      type="submit"
                      disabled={isTyping}
                      className="p-1.5 bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                      <ArrowUp size={20} strokeWidth={3} />
                    </button>
                  ) : (
                    <button type="button" className="p-2 text-primary-text hover:text-white transition-colors">
                      <Mic size={20} />
                    </button>
                  )}
                </div>
              </form>
              <div className="text-center mt-2 text-xs text-secondary-text">
                CodeMentor AI can make mistakes. Consider verifying important information.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
