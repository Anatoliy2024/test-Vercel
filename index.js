const express = require("express")
const http = require("http")
const authRouter = require("./routes/auth.routes")

const app = express()
const port = process.env.PORT
const server = http.createServer(app)

app.get("/", (req, res) => {
  res.json({ message: "Hellow,World" })
})
app.get("/test", (req, res) => {
  res.json({ message: "Test" })
})

app.use("/auth", authRouter)

server.listen(port, () => {
  console.log(`Starting Server on port ${port}`)
})
