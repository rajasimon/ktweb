import { useNavigate } from "react-router-dom"
import { useAuth } from "../../auth"
import { useEffect } from "react"

const Logout = () => {
  
  const { logout } = useAuth()
  const navigate  = useNavigate()
  
  useEffect(() => {
    logout()
    navigate("/")
  }, [])

  return (
    <></>
  )
}

export default Logout