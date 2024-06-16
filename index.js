const express = require("express")
const http = require("http")
const authRouter = require("./routes/auth.routes")
const mongoose = require("mongoose")
const app = express()
const config = require("config")
const port = process.env.PORT
const server = http.createServer(app)
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
const dbUrl = config.get("dbUrl")
console.log(`NODE_ENV: ${dbUrl}`)

app.get("/", (req, res) => {
  res.json({ message: "Hellow,World" })
})
app.get("/test", (req, res) => {
  res.json({ message: "Test" })
})

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

app.use("/auth", authRouter)

server.listen(port, () => {
  console.log(`Starting Server on port ${port}`)
})
