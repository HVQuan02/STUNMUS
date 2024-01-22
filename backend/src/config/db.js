import mongoose from 'mongoose'

async function connectToMongoDB() {
  try {
    // sau nay connect to mongodb atlas
    await mongoose.connect('mongodb://127.0.0.1:27017/stunmus')
    console.log('Connected to MongoDB successfully!')
  }
  catch (err) {
    console.log('Failed to connect to MongoDB due to error: ', err)
  }
}

export default connectToMongoDB