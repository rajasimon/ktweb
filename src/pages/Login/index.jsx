import { useEffect, useState } from "react"

import { Alert } from "../../components/Alert"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"


import loginImage from "../../assets/login.png"
import edcIcon from "../../assets/EDC_Icon.png"
import Ellipse from "../../assets/Ellipse.png"
import EllipseWhiteFace from "../../assets/Ellipse_white_face.png"
import faceSVG from "../../assets/face.svg"
import danger from "../../assets/danger.svg"
import toastIconWarningPNG from "../../assets/images/ToastIconWarning.png"

import { Face } from "./face"
import { Camera } from "./camera"
import { Success } from "./success"
import { Fail } from "./fail"

import { useAuth } from "../../auth"
import { useNavigate } from "react-router-dom"
import Bowser from "bowser"

const Login = () => {
  const backendPath = import.meta.env.VITE_BACKEND_PATH

  const placeHolder = 'Student ID or traffic file number'
  
  const navigate = useNavigate()
  const [mode, setMode] = useState('')
  const [name, setName] = useState(null)
  const [isInputFailed, setIsInputFailed] = useState(false)
  const { token, login, logout } = useAuth()
  const [typeInput, setTypeInput] = useState();
  const [isLoading, setIsLoading] = useState(false)
  
  const handleInputClick = () => {
    setIsLoading(true)
    fetch(`${backendPath}/api/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"password": "admin", "username": typeInput})
    }).then((res) => res.json()).then(response => {
      if ("id_token" in response) {
        login(response.id_token, typeInput, "")
        // input, face, success, fail, link, camera
        if (mode === 'input') {
          setMode('camera')
          setIsLoading(false)
        }        
      } else {
        setIsInputFailed(true)
        setIsLoading(false)
      }
    })
    
  }

  const handleInputOnChange = (event) => {
    setIsLoading(false)
    setIsInputFailed(false)
    setTypeInput(event.target.value)
  }

  useEffect(() => {
    const browser = Bowser.parse(window.navigator.userAgent)
    console.log(browser)
    if (browser.browser.name === "Safari" || browser.platform.type === "mobile") {
      setMode("combaitable")
    } else {
      setMode("input")
    }
  }, [])

  // useEffect(() => {
  //   navigator.permissions.query({ name: "camera" }).then(res => {
  //     if(res.state == "granted"){
  //       console.log("Permission to access camera is granted")
  //     } else {
  //       console.log("Permission to access camera not given")
  //     }
  //   });
  // }, [])


  const combaitableMode = (
    <div>
      <div className="mt-10 mb-20">
        <Alert icon={toastIconWarningPNG} isDanger={true} title="Unsupported Device" subtitle="The system is optimized for desktops or laptops with a microphone and camera, in line with governance and compliance policies and requirements. Please use access the system from sa supported device to run the test." />
      </div>
    </div>
  )

  const inputMode = (
    <div>
      <Input placeHolder={placeHolder} onChange={handleInputOnChange}  />
      <div className="mt-10 mb-20">
        {isInputFailed && (
          <Alert icon={toastIconWarningPNG} isDanger={true} subtitle="The entered student ID / Traffic file number could not be found. enter valid number or contact Emirates Driving customer service for assisstant. " />
        )}

        {!isInputFailed && (
          <Alert icon={faceSVG} title="Data Privacy Notice" subtitle="Our system authenticate using facial recognition. By using this system, you acknowledge that all captured data is subject to the EDC privacy policy and terms." />
        )}
      </div>
      <Button title="Confirm and Proceed" isLoading={isLoading} isFull={true} onClick={handleInputClick} />
    </div>
  )

  const faceMode = <Face setMode={setMode} typeInput={typeInput} setName={setName} />

  const successMode = <Success typeInput={typeInput} name={name} />

  const failMode = <Fail />

  const linkMode = (
    <div className="flex flex-col items-center space-y-6">
      <Alert icon={danger} isDanger={true} subtitle="This link is no longer valid, please contact the driving school for more information." />
    </div>
  )

  const cameraMode = <Camera setMode={setMode} />

  return (
    <div className="flex flex-row h-screen bg-[#F1F1F8]">
      <div className="w-3/5 bg-gradient-to-r from-[#025EE1] to-[#171C8F] hidden md:block">
        <div className="flex items-center justify-center h-full">
          <img src={loginImage} alt="" width="633" height="600" />
          <div className="absolute bottom-0">
            <p className="text-white py-4">Copyright © 2024 Performise Labs, all rights reserved</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 md:px-16 md:py-6 flex flex-col items-center w-full md:w-2/5">
        <div className="flex w-full justify-end">
          <img src={edcIcon} alt="" />
        </div>
        <div className="flex flex-col mt-5 mb-5 md:mt-24 md:mb-24 w-full">
          <p className="text-[#505050] text-xl md:text-2xl">Welcome to</p>
          <p className="text-[#505050] text-2xl md:text-4xl"><span className="font-bold">O</span>nline <span className="font-bold">K</span>nowledge <span className="font-bold">T</span>est</p>
        </div>
        {mode === "combaitable" && combaitableMode}
        {mode === "input" && inputMode}
        {mode === "face" && faceMode}
        {mode === "success" && successMode}
        {mode === "fail" && failMode}
        {mode === "link" && linkMode}
        {mode === "camera" && cameraMode}
      </div>
    </div>
  )
}

export default Login