

import { useNavigate } from "react-router-dom"
import EllipseWhiteFace from "../../assets/Ellipse_white_face.png"
import { useEffect } from "react"
import { useAuth } from "../../auth"


export const Success = ({typeInput, name}) => {
  // Uncomment below when cors issue is fixed
  // const backendPath = "http://localhost:5000"
  const backendPath = import.meta.env.VITE_BACKEND_PATH
  
  const navigate = useNavigate()
  const { token, login, logout } = useAuth()

  const authenticateAPI = async () => (
    fetch(`${backendPath}/api/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"password": "admin", "username": typeInput})
    }).then((res) => res.json()).then(response => {
      return response
    })
  )

  useEffect(() => {
    const authenticateTheUser = async () => {
      const response = await authenticateAPI()
      if ("id_token" in response) {
        login(response.id_token, typeInput, name)
        setTimeout(() => {console.log("token found"), 2000})
        navigate("/test")

      } else {
        setMode("fail")
        console.log("Face matched but the API call failed.")
      }
    }
    authenticateTheUser()

  }, [])


  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-2xl font-bold text-[#00B154]" style={{ textShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'}}>AUTHENTICATION SUCCEEDED</p>
      <img src={EllipseWhiteFace} alt="" />
    </div>
  )
}
