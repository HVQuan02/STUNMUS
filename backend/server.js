import express from 'express'
import routing from './src/routes/index.route.js'
import setConfig from './src/config/app.js'
import connectToMongoDB from './src/config/db.js'

const app = express()

setConfig(app)
routing(app)
connectToMongoDB()

app.listen(8000, () => {
  console.log('App is listening on port 8000...')
})