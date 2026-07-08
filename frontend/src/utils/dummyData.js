export const dummyAIResponse = `
Here's a breakdown of the code you provided:

This snippet sets up a basic Express server and defines a single route. It listens on port 3000 and responds with 'Hello World' when a GET request is made to the root URL.

### Line-by-Line Explanation

\`\`\`javascript
const express = require('express') // Imports the Express framework
const app = express() // Initializes a new Express application instance
const port = 3000 // Defines the port number the server will listen on

app.get('/', (req, res) => { // Defines a route handler for GET requests to the root path '/'
  res.send('Hello World!') // Sends the string 'Hello World!' as the HTTP response
})

app.listen(port, () => { // Starts the server and listens for connections on the specified port
  console.log(\`Example app listening on port \${port}\`) // Logs a message to the console once the server is running
})
\`\`\`

### Bug Detection
No critical bugs were found in this snippet. However, error handling is absent.

### Complexity Analysis
- **Time Complexity:** O(1) for the single route.
- **Space Complexity:** O(1).

### Best Practices & Security
- Add error handling middleware.
- Use environment variables for the port (e.g., \`process.env.PORT\`).
- No major security issues detected in this simple example. In production, consider using libraries like \`helmet\` to set secure HTTP headers.

### Analogy
Think of the Express server as a receptionist at a building. When someone arrives at the front desk (the root URL \`/\`), the receptionist says 'Hello World!'. The server simply waits (listens) for people to arrive.
`

export const dummyAnalysisData = {
  bugs: [
    { title: "No error handling", description: "The route does not catch asynchronous errors.", severity: "warning" },
    { title: "Hardcoded port", description: "Port 3000 is hardcoded instead of using environment variables.", severity: "info" }
  ],
  security: [
    { title: "Missing CORS", description: "Cross-Origin Resource Sharing is not configured.", severity: "high" },
    { title: "Helmet missing", description: "Security headers are not set.", severity: "medium" }
  ],
  complexity: {
    time: "O(1)",
    space: "O(1)",
    description: "The route operates in constant time as it simply returns a static string."
  },
  smells: [
    { title: "Global state", description: "The app instance is in the global scope." }
  ],
  best_practices: [
    { title: "Use Environment Variables", description: "Define PORT in a .env file." },
    { title: "Use a Router", description: "Extract routes into a separate Express Router file." }
  ],
  optimizations: [
    { title: "Extract logic", description: "Move the response string to a controller function." }
  ],
  learning: [
    { title: "Express Routing", url: "https://expressjs.com/en/guide/routing.html" },
    { title: "Security Best Practices", url: "https://expressjs.com/en/advanced/best-practice-security.html" }
  ],
  flow: "Client Request -> Express App -> GET / Route Handler -> Response"
}
