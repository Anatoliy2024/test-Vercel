import express from "express"

const app = express()
const port = 9000

app.use("/", (req, res) => {
  res.json({ message: "Hellow,World" })
})

app.listen(9000, () => {
  console.log(`Starting Server on port ${port}`)
})
