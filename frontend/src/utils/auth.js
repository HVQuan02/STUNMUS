import { toast } from 'react-toastify'

export function checkValidEmail(email) {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

export function checkSignUpForm(email, username, password) {
  const isValidEmail = checkValidEmail(email)
  if (!isValidEmail) {
    toast.error('Invalid email!')
    return false
  }
  if (username.length === 0) {
    toast.error('Username is required!')
    return false
  }
  if (password.length < 8) {
    toast.error('Password must be at least 8 characters!')
    return false
  }
  return true
}