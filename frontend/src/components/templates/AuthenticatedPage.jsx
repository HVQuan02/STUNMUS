import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function AuthenticatedPage(WrappedComponent) {
  return () => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
      const cc = JSON.parse(localStorage.getItem('stunmus'))
      const jwtToken = cc?.accessToken
      const googleToken = cc?.googleToken
      const tokens = {
        jwtToken, googleToken
      }
      axios.post('http://localhost:8000/auth/verifyTokens', tokens)
        .then(res => {
          if (res.data.code === 0) {
            setIsLoading(false)
          }
          else {
            navigate('/sign-in')
          }
        })
        .catch(err => console.log(err))
    }, [])

    if (isLoading) {
      return (
        <h1>Loading ...</h1>
      )
    }

    return <WrappedComponent />
  }
}

export default AuthenticatedPage