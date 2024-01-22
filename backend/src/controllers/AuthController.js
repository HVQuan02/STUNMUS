import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { signAccessToken } from '../utils/token.js'
import { verifyAccessToken, verifyGoogleToken } from '../utils/auth.js'

class AuthController {
  // [POST] /auth/sign-up
  async signUp(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        return res.json({
          code: 2,
          msg: 'Email already exists!'
        })
      }

      const saltRounds = 10
      req.body.password = await bcrypt.hash(req.body.password, saltRounds)

      await User.create({ ...req.body })
      res.json({
        code: 0,
        msg: 'Sign up successfully!'
      })
    }
    catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }

  // [POST] /auth/sign-in
  async signIn(req, res) {
    const { email, password } = req.body
    try {
      const user = await User.findOne({ email })
      if (user) {
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (isPasswordMatched) {
          const token = signAccessToken(user._id)
          res.json({
            code: 0,
            msg: 'Sign in successfully!',
            token
          })
        }
        else {
          res.json({
            code: 2,
            msg: 'Wrong password!'
          })
        }
      }
      else {
        res.json({
          code: 1,
          msg: 'Email does not exist!'
        })
      }
    }
    catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }

  // [POST] /auth/verifyGoogleToken
  async verifyGoogleToken(req, res) {
    const { googleToken } = req.body
    const msg = await verifyGoogleToken(googleToken)
    res.json(msg)
  }

  async verifyAccessToken(req, res) {
    const clientToken = req.body.token
    const msg = await verifyAccessToken(clientToken)
    res.json(msg)
  }

  async verifyTokens(req, res) {
    const { jwtToken, googleToken } = req.body
    if (jwtToken) {
      const msg = await verifyAccessToken(jwtToken)
      return res.json(msg)
    }
    if (googleToken) {
      const msg = await verifyGoogleToken(googleToken)
      return res.json(msg)
    }
    res.json({
      code: -1,
      msg: 'No tokens found!'
    })
  }
}

export default new AuthController()