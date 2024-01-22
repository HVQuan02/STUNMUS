import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { GoogleOAuthProvider } from '@react-oauth/google'
import 'react-toastify/dist/ReactToastify.css'

import Homepage from "./components/Homepage"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"

const App = () => {
  return (
    <>
      {/* migrate to routes folder later */}
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GGAUTH_CLIENT_ID}>
        <Routes>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/" element={<Homepage />}></Route>
        </Routes>
        <ToastContainer />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
