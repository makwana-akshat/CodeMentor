import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Dashboard from './Dashboard'

export default function History() {
  const location = useLocation()
  
  // We simulate different chats based on some state or just return a dummy chat
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

  return (
    <Dashboard initialMessages={dummyHistoryMessages} />
  )
}
