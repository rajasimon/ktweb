import { Alert } from "../../components/Alert"
import { Button } from "../../components/Button"

import camera from "../../assets/camera.svg"
import { useEffect } from "react"

export const Camera = ({setMode}) => {
  const handleCameraClick = () => {
    navigator.getUserMedia({video:true}, 
      (stream) => {
        const getTracks = stream.getTracks();
        getTracks.forEach((tracks) => {
          if (tracks.kind === "video") {
            setMode("face")
          }
        })
      }, 
      (error) => {
        console.log("Error accessing user media", error)
      })
  }

  // On the initial page render find out user is already enable the camera or not
  useEffect(() => {
    const cameraProcess = async () => {
      const permission = await navigator.permissions.query( {name: "camera"})
      console.log(permission)
      if (permission.state === "granted") {
        setMode("face")
      }
    } 

    cameraProcess()
  })

  return (
    <div className="flex flex-col items-center space-y-16">
      <Alert icon={camera} isDanger={true} title="Camera is inaccessible" subtitle="The system uses facial recognition to authenticate. Your camera is in use by another app or needs permission. Please enable camera access in your browser settings to continue." />
      <div className="w-full">
        <Button title="Allow Access"  isFull={true} onClick={handleCameraClick} />
      </div>
    </div>
  )
}