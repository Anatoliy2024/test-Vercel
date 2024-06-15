// const Router = require("express")
const User = require("../models/User")
const config = require("config")
//хеширование пароля
const bcrypt = require("bcryptjs")
//проверка емалиа и пароля на корректность
const { check, validationResult } = require("express-validator")
//проверка Users
const jwt = require("jsonwebtoken")
// const router = new Router()
const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/auth.middleware")

router.post(
  "/registration",
  [
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      //   console.log(req.body)
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors })
      }

      const { name, password } = req.body
      const candidate = await User.findOne({ name })
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with ${name} already exist` })
      }
      const hashPassword = await bcrypt.hash(password, 8)
      const user = new User({
        name,
        password: hashPassword,
        avatar: "",
      })
      await user.save()
      return res.json({ message: "User was create" })
    } catch (e) {
      console.log(e)
      res.send({ message: "Server Error" })
    }
  }
)

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password" })
    }
    const token = jwt.sign(
      { id: user.id, name: user.name, avatar: user.avatar },
      config.get("secretKey"),
      {
        expiresIn: "1h",
      }
    )

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
    })
  } catch (e) {
    console.log(e)
    res.send({ message: "Server Error" })
  }
})

router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id })

    const token = jwt.sign(
      { id: user.id, name: user.name, avatar: user.avatar },
      config.get("secretKey"),
      {
        expiresIn: "1h",
      }
    )

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
    })
  } catch (e) {
    console.log(e)
    res.send({ message: "Server Error" })
  }
})

module.exports = router

// const express = require("express")
// const router = express.Router()

// router.get("/", (req, res) => {
//   res.json({ message: "Auth Home" })
// })

// router.get("/login", (req, res) => {
//   res.json({ message: "Login Page" })
// })

// router.get("/signup", (req, res) => {
//   res.json({ message: "Signup Page" })
// })

// module.exports = router
