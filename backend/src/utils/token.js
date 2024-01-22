import jwt from 'jsonwebtoken'

export function signAccessToken(userId) {
  const payload = {
    userId
  }
  // configure later
  const accessKey = process.env.JWT_ACCESS_TOKEN
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, accessKey, options)
}