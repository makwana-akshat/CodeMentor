import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import CodeInput from '../components/CodeInput'
import { dummyAIResponse } from '../utils/dummyData'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowUp, ArrowDown, Paperclip, Mic, Loader2, Code, Bug, Wrench, Plus } from 'lucide-react'
import ChatMessage from '../components/ChatMessage'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import ChatSkeleton from '../components/ChatSkeleton'

export default function Dashboard() {
  const { chatId } = useParams()
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [followUp, setFollowUp] = useState('')
  const [isLoadingChat, setIsLoadingChat] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)

  const startScreenRef = useRef(null)

  // Dummy history messages for simulation
  const dummyHistoryMessages = useMemo(() => [
    { 
      type: 'user', 
      content: 'Can you help me refactor this Python Flask API? It\'s getting too messy.', 
      isCode: false 
    },
    { 
      type: 'ai', 
      content: 'Absolutely. A common issue with Flask APIs is having all your routes, logic, and database queries in one file. I recommend adopting a layered architecture (Controllers, Services, Repositories) or using Blueprints to modularize your code.\n\nCould you share a snippet of your current `app.py` so I can give specific recommendations?',
      isCode: false 
    },
    { 
      type: 'user', 
      content: `from flask import Flask, jsonify, request\nimport sqlite3\n\napp = Flask(__name__)\n\n@app.route('/users', methods=['GET', 'POST'])\ndef users():\n    conn = sqlite3.connect('app.db')\n    cursor = conn.cursor()\n    \n    if request.method == 'GET':\n        cursor.execute("SELECT * FROM users")\n        users = cursor.fetchall()\n        return jsonify(users)\n    elif request.method == 'POST':\n        data = request.get_json()\n        cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)", (data['name'], data['email']))\n        conn.commit()\n        return jsonify({"status": "success"})\n\nif __name__ == '__main__':\n    app.run(debug=True)`, 
      isCode: true 
    },
    {
      type: 'ai',
      content: 'Thanks for sharing. I can see why it feels messy. You are mixing routing, database connections, and business logic in a single function.\n\nHere is how I would refactor it using a `Service` layer pattern:\n\n```mermaid\ngraph TD;\n    A[Route: /users] --> B(UserService);\n    B --> C{Database};\n    C --> B;\n    B --> A;\n```\n\nLet\'s break this out into `routes.py`, `services.py`, and `db.py` to keep it clean.'
    }
  ], [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    if (scrollHeight - scrollTop - clientHeight > 150) {
      setShowScrollButton(true)
    } else {
      setShowScrollButton(false)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (chatId) {
      setIsLoadingChat(true)
      setMessages([]) // clear current messages
      const timer = setTimeout(() => {
        setMessages(dummyHistoryMessages)
        setIsLoadingChat(false)
      }, 800)
      return () => clearTimeout(timer)
    } else {
      setMessages([])
      setIsLoadingChat(false)
    }
  }, [chatId, dummyHistoryMessages])

  useGSAP(() => {
    if (messages.length > 0 && containerRef.current) {
      const lastMessage = containerRef.current.lastElementChild
      gsap.fromTo(lastMessage, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, { dependencies: [messages], scope: containerRef })

  useGSAP(() => {
    if (messages.length === 0 && startScreenRef.current) {
      const heading = startScreenRef.current.querySelector('h1')
      const inputContainer = startScreenRef.current.querySelector('.code-input-container')
      const buttons = startScreenRef.current.querySelectorAll('.action-button')
      
      gsap.fromTo(heading, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power3.out' })
      gsap.fromTo(inputContainer, { opacity: 0, scale: 0.95, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'back.out(1.2)' })
      gsap.fromTo(buttons, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.5, ease: 'power2.out' })
    }
  }, { dependencies: [messages] })

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

  const handleVisualizeCode = () => {
    const visualizePrompt = "Visualize the architecture of the previous code snippet using a Mermaid flowchart."
    setMessages([...messages, { type: 'user', content: visualizePrompt, isCode: false }])
    setIsTyping(true)
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: `Here is the architecture visualization:\n\n\`\`\`mermaid\ngraph TD;\n    A[Code Input] --> B(Parser);\n    B --> C{Analyzer};\n    C -->|Valid| D[Generator];\n    C -->|Invalid| E[Error Handler];\n\`\`\``
      }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full w-full bg-background relative">
      {isLoadingChat ? (
        <ChatSkeleton />
      ) : messages.length === 0 ? (
        <div ref={startScreenRef} className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto w-full px-4">
          <h1 className="text-3xl font-semibold text-primary-text mb-8">Where should we begin?</h1>
          <div className="code-input-container w-full relative shadow-2xl rounded-xl">
            <CodeInput onSubmit={handleCodeSubmit} isLoading={isTyping} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button className="action-button flex items-center px-4 py-2 rounded-full border border-border text-sm font-medium text-primary-text hover:bg-[#2A2B32] transition-colors bg-transparent">
              <Code className="mr-2 text-secondary-text" size={16} /> Analyze Complexity
            </button>
            <button className="action-button flex items-center px-4 py-2 rounded-full border border-border text-sm font-medium text-primary-text hover:bg-[#2A2B32] transition-colors bg-transparent">
              <Bug className="mr-2 text-secondary-text" size={16} /> Find Bugs
            </button>
            <button className="action-button flex items-center px-4 py-2 rounded-full border border-border text-sm font-medium text-primary-text hover:bg-[#2A2B32] transition-colors bg-transparent">
              <Wrench className="mr-2 text-secondary-text" size={16} /> Refactor Code
            </button>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col h-full w-full overflow-hidden">
          <div 
            className="flex-1 overflow-y-auto pt-8 pb-40 scrollbar-thin" 
            ref={containerRef}
            onScroll={handleScroll}
          >
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

          <div className="absolute bottom-0 left-0 w-full pt-10 pb-6 bg-gradient-to-t from-background via-background to-transparent z-10 pointer-events-none">
            <div className="max-w-3xl mx-auto px-4 relative pointer-events-auto">
              {showScrollButton && (
                <button 
                  onClick={scrollToBottom}
                  className="absolute -top-14 left-1/2 -translate-x-1/2 p-2 bg-[#2F2F2F] border border-border rounded-full text-secondary-text hover:text-primary-text transition-colors shadow-lg z-20"
                >
                  <ArrowDown size={16} />
                </button>
              )}
              
              <div className="relative flex items-center bg-[#2F2F2F] rounded-full shadow-md">
                <Popover>
                  <PopoverTrigger className="pl-4 pr-3 py-3 text-secondary-text hover:text-primary-text transition-colors cursor-pointer outline-none flex items-center justify-center">
                    <div className="p-1 rounded-full bg-[#161B22] border border-border flex items-center justify-center shadow-sm">
                      <Plus size={18} strokeWidth={2.5} />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent side="top" align="start" sideOffset={12} className="w-56 bg-[#2F2F2F] border-border text-primary-text shadow-xl p-1.5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleVisualizeCode()}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-[#3E3E3E] rounded-md transition-colors flex items-center space-x-3"
                    >
                      <Code size={16} className="text-accent" />
                      <span>Generate Diagram</span>
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm hover:bg-[#3E3E3E] rounded-md transition-colors flex items-center space-x-3"
                    >
                      <Bug size={16} className="text-secondary-text" />
                      <span>Find Deep Bugs</span>
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm hover:bg-[#3E3E3E] rounded-md transition-colors flex items-center space-x-3"
                    >
                      <Wrench size={16} className="text-secondary-text" />
                      <span>Refactor</span>
                    </button>
                  </PopoverContent>
                </Popover>
                
                <form onSubmit={handleFollowUpSubmit} className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={followUp}
                    onChange={(e) => setFollowUp(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-primary-text py-3.5 text-base placeholder-secondary-text"
                  />
                  <div className="pr-2 pl-3 flex items-center">
                    {followUp.trim() ? (
                      <button
                        type="submit"
                        disabled={isTyping}
                        className="w-9 h-9 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                      >
                        <ArrowUp size={20} strokeWidth={3} />
                      </button>
                    ) : (
                      <button type="button" className="w-9 h-9 flex items-center justify-center text-secondary-text hover:text-white transition-colors">
                        <Mic size={20} />
                      </button>
                    )}
                  </div>
                </form>
              </div>
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
