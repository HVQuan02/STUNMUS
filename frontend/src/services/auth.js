import axios from 'axios'
import { toast } from 'react-toastify'

const serverBaseURL = import.meta.env.VITE_SERVER_BASE_URL

export async function createNewAccount(userData) {
  let status = false
  await axios.post(serverBaseURL + '/auth/sign-up', userData)
    .then(res => {
      if (res.data.code === 0) {
        toast.success(res.data.msg)
        status = true
      }
      toast.error(res.data.msg)
    })
    .catch(err => console.log(err))
  return status
}

export async function signIn(userData) {
  let status = false
  await axios.post(serverBaseURL + '/auth/sign-in', userData)
    .then(res => {
      const { code, msg, token } = res.data
      if (code === 0) {
        toast.success(msg)
        localStorage.setItem('stunmus', JSON.stringify({
          accessToken: token
        }))
        status = true
      }
      toast.error(msg)
    })
    .catch(err => console.error(err))
  return status
}

export async function signInWithGoogle(data) {
  let status = false
  await axios.post('http://localhost:8000/auth/verifyGoogleToken', data)
    .then(res => {
      if (res.data.code === 0) {
        toast.success(res.data.msg)
        const oldData = JSON.parse(localStorage.getItem('stunmus'))
        const newData = { ...oldData, ...data }
        localStorage.setItem('stunmus', JSON.stringify(newData))
        console.log('User info: ', res.data.payload)
        status = true
      }
      else {
        toast.error(res.data.msg)
      }
    })
    .catch(err => console.error(err))
  return status
}