const express = require("express")
const http = require("http")

const app = express()
const port = process.env.PORT
const server = http.createServer(app)

server.get("/", (req, res) => {
  res.json({ message: "Hellow,World" })
})
server.get("/test", (req, res) => {
  res.json({ message: "Test" })
})

server.listen(port, () => {
  console.log(`Starting Server on port ${port}`)
})
