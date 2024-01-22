import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, minLength: 1, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, minLength: 8, required: true }
}, {
  timestamps: true
})

export default mongoose.model('User', UserSchema)