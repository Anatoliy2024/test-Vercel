import express from "express"

const app = express()
const port = 9000

app.get("/", (req, res) => {
  res.json({ message: "Hellow,World" })
})
app.get("/test", (req, res) => {
  res.json({ message: "Test" })
})

app.listen(9000, () => {
  console.log(`Starting Server on port ${port}`)
})
