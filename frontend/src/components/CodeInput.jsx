import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { SendHorizontal } from 'lucide-react'

export default function CodeInput({ onSubmit, isLoading }) {
  const [code, setCode] = useState('// Paste your code here\n')
  const [language, setLanguage] = useState('javascript')
  const [level, setLevel] = useState('intermediate')

  const handleSubmit = () => {
    if (code.trim() && onSubmit) {
      onSubmit({ code, language, level })
    }
  }

  return (
    <div className="flex flex-col border border-border rounded-xl bg-cards overflow-hidden shadow-lg w-full transition-all duration-300 focus-within:ring-2 focus-within:ring-accent/50 focus-within:border-accent">
      <div className="flex items-center justify-between p-2 border-b border-border bg-sidebar">
        <div className="flex items-center space-x-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[140px] h-8 bg-background border-border text-primary-text focus:ring-accent">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-cards border-border text-primary-text">
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>

          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-[140px] h-8 bg-background border-border text-primary-text focus:ring-accent">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent className="bg-cards border-border text-primary-text">
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !code.trim()}
          size="sm" 
          className="bg-accent hover:bg-accent/90 text-white h-8"
        >
          <SendHorizontal size={16} className="mr-2" />
          Explain
        </Button>
      </div>
      
      <div className="relative w-full h-[300px]">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            fontFamily: 'Inter, monospace',
            wordWrap: "on"
          }}
        />
      </div>
    </div>
  )
}
