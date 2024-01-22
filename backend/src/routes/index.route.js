import authRouter from './auth.route.js'

function routing(app) {
  app.use('/auth', authRouter)
}

export default routing