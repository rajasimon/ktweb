

import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import authenticationSuccessfulGIF from "../../assets/images/AuthenticationSuccessful.gif"


export const Success = () => {
  
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {console.log("Successfull authentication redirect to test"), 4000})
    navigate("/test")
  }, [])


  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-2xl font-bold text-[#00B154]" style={{ textShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'}}>AUTHENTICATION SUCCEEDED</p>
      <img src={authenticationSuccessfulGIF} alt="" />
    </div>
  )
}
