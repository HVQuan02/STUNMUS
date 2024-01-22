import express from 'express'
import AuthController from '../controllers/AuthController.js'

const router = express.Router()

router.post('/sign-up', AuthController.signUp)
router.post('/sign-in', AuthController.signIn)
router.post('/verifyGoogleToken', AuthController.verifyGoogleToken)
router.post('/verifyAccessToken', AuthController.verifyAccessToken)
router.post('/verifyTokens', AuthController.verifyTokens)

export default router