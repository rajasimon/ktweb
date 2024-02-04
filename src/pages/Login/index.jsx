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

import { Face } from "./face"
import { Camera } from "./camera"
import { Success } from "./success"
import { Fail } from "./fail"

import { useAuth } from "../../auth"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const placeHolder = 'Student ID or traffic file number'
  
  const navigate = useNavigate()
  const [mode, setMode] = useState('input')
  const [name, setName] = useState(null)
  const { token, login, logout } = useAuth()
  const [typeInput, setTypeInput] = useState();
  
  const handleInputClick = () => {
    // input, face, success, fail, link, camera
    if (mode === 'input') {
      setMode('camera')
    }
  }

  const handleInputOnChange = (event) => {
    setTypeInput(event.target.value)
  }

  useEffect(() => {
    navigator.permissions.query({ name: "camera" }).then(res => {
      if(res.state == "granted"){
        console.log("Permission to access camera is granted")
      } else {
        console.log("Permission to access camera not given")
      }
    });
  })

  const inputMode = (
    <div>
      <Input placeHolder={placeHolder} onChange={handleInputOnChange}  />
      <div className="mt-10 mb-20">
        <Alert icon={faceSVG} title="Data Privacy Notice" subtitle="Our system authenticate using facial recognition. By using this system, you acknowledge that all captured data is subject to the EDC privacy policy and terms." />
      </div>
      <Button title="Confirm and Proceed" isFull={true} onClick={handleInputClick} />
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
    <div className="flex flex-row h-screen">
      <div className="flex items-center justify-center w-3/5 bg-gradient-to-r from-[#025EE1] to-[#171C8F]">
        <img src={loginImage} alt="" width="633" height="600" />
        <div className="absolute bottom-0">
          <p className="text-white py-4">Copyright © 2024 Performise Labs, all rights reserved</p>
        </div>
      </div>
      <div className="px-16 py-6 flex flex-col items-center w-2/5">
        
        <div className="flex w-full justify-end">
          <img src={edcIcon} alt="" />
        </div>
        <div className="mt-24 mb-24 w-3/4 flex flex-col">
          <p className="text-[#505050] text-2xl">Welcome to</p>
          <p className="text-[#505050] text-4xl"><span className="font-bold">O</span>nline <span className="font-bold">K</span>nowledge <span className="font-bold">T</span>est</p>
        </div>
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