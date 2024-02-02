import { useEffect } from "react"

import { useAuth } from "./auth"
import { useNavigate } from "react-router-dom"

// Landing page to determine what page to transfer the user from
export default function App() {

  const { token, login, logout, userID, userName } = useAuth()
  console.log(userID, userName)
  const navigate = useNavigate()

  useEffect(() => { 
    if (!token) {
      navigate("/login")
    } else {
      navigate("/test")   
    }
    console.log('token found', token)    
  }, [token, navigate])

  return (
    <h1 className="text-3xl font-bold underline">Knowledge Test</h1>
  )
}