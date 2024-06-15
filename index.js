import express from "express"

const app = express()
// const port = process.env.PORT

app.get("/", (req, res) => {
  res.json({ message: "Hellow,World" })
})
app.get("/test", (req, res) => {
  res.json({ message: "Test" })
})

// app.listen(port, () => {
//   console.log(`Starting Server on port ${port}`)
// })
