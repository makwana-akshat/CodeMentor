import React, { useRef } from 'react'
import Editor from '@monaco-editor/react'

export default function EditorPlaceholder({ language }) {
  const editorRef = useRef(null)

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
  }

  const defaultCode = {
    javascript: '// Enter your JavaScript code here\nconsole.log("Hello, CodeMentor AI!");\n',
    python: '# Enter your Python code here\nprint("Hello, CodeMentor AI!")\n',
    cpp: '// Enter your C++ code here\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, CodeMentor AI!" << std::endl;\n    return 0;\n}\n',
    java: '// Enter your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CodeMentor AI!");\n    }\n}\n'
  }

  return (
    <div className="h-full w-full relative">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark" // We can make this dynamic based on the app's dark mode
        value={defaultCode[language] || '// Start coding...'}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
      <div className="absolute bottom-4 right-4 z-10">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg font-medium transition-colors">
          Explain Code
        </button>
      </div>
    </div>
  )
}
