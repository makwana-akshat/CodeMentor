import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Check, Copy } from 'lucide-react'
import Mermaid from './Mermaid'

export default function ChatMessage({ content }) {
  return (
    <div className="w-full text-primary-text leading-relaxed">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : 'text'
            const codeString = String(children).replace(/\n$/, '')
            
            if (!inline && language === 'mermaid') {
              return <Mermaid chart={codeString} />
            }
            if (!inline) {
              return <CodeBlock language={language} code={codeString} />
            }
            return (
              <code className="bg-[#2A2B32] px-1.5 py-0.5 rounded-md text-sm font-mono text-accent" {...props}>
                {children}
              </code>
            )
          },
          h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>,
          p: ({ children }) => <div className="mb-4">{children}</div>,
          ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          a: ({ children, href }) => <a href={href} className="text-accent hover:underline">{children}</a>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-border pl-4 italic text-secondary-text mb-4">{children}</blockquote>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-4 rounded-xl overflow-hidden bg-[#0D1117] border border-border">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161B22] border-b border-border text-xs text-secondary-text">
        <span className="font-mono">{language}</span>
        <button 
          onClick={handleCopy}
          className="flex items-center space-x-1.5 hover:text-primary-text transition-colors"
        >
          {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
          <span>{copied ? 'Copied!' : 'Copy code'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm">
        <SyntaxHighlighter
          language={language === 'text' ? 'javascript' : language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
          }}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
