import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'

export async function verifyGoogleToken(googleToken) {
  const clientId = process.env.REACT_APP_CLIENT_ID
  const client = new OAuth2Client(clientId)
  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken
    })

    const payload = ticket.getPayload()
    return {
      code: 0,
      msg: "Sign in with Google successfully!",
      payload
    }
  }
  catch (error) {
    return {
      code: -1,
      msg: 'Failed to verify Google credential!'
    }
  }
}

export async function verifyAccessToken(clientToken) {
  if (!clientToken) {
    return {
      code: 1,
      msg: 'Unauthorized'
    }
  }
  const jwtSecretToken = process.env.JWT_ACCESS_TOKEN
  let cc
  jwt.verify(clientToken, jwtSecretToken, function (err, payload) {
    if (err) {
      cc = {
        code: 2,
        msg: 'Invalid token'
      }
    }
    cc = {
      code: 0,
      msg: 'Token verified',
      payload
    }
  })
  return cc
}