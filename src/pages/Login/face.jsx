import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Ellipse from "../../assets/Ellipse.png"
import FaceAnimation from "../../assets/faceanimation.gif"
import { useAuth } from "../../auth"


export const Face = ({ setMode, setName, typeInput }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  const backendPath = import.meta.env.VITE_BACKEND_PATH
  const { token, login, logout } = useAuth()

  const convertFrameToBlob = async (video) => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    return new Promise((resolve) => {
      canvas.toBlob(blob => {
        resolve(blob);
      }, 'image/jpeg', 1);
    });
  };

  const facialAPI = async (blob, typeInput) => {
    const formData = new FormData()
    formData.append('file', blob, 'face.jpg');
    formData.append('studentID', typeInput)
    const response = await fetch(`https://face.olivedev.xyz/api/v1/recognition/recognize`, {
      method: 'POST',
      headers: {
        'x-api-key': 'd38985c8-6d07-4c18-a109-e07de7c6c625'
      },
      body: formData
    });
    return await response.json();
  }

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


  
  useEffect(()=> {
    
    async function enableCamera() {
      // Get Video and take the image call the facial API 
      navigator.getUserMedia({video:{ width:133, height:157 }}, 
        (stream) => {
          setShowAnimation(true)

          const getTracks = stream.getTracks();
          getTracks.forEach(async (tracks) => {
            if (tracks.kind === "video") {

              const video = document.createElement("video");
              video.srcObject = stream;

              video.addEventListener("loadedmetadata", async () => {
                video.play();
                const blob = await convertFrameToBlob(video)
                console.log(blob)

                // Also call authentication API here.
                const response = await authenticateAPI()
                if ("id_token" in response) {
                  login(response.id_token, typeInput, typeInput)
                  const facialAPIResponse = await facialAPI(blob, typeInput)

                  if ("code" in facialAPIResponse) {
                    console.log(facialAPIResponse.message)
                    setMode("fail")
                  }
  
                  // Show pass/fail screen based on the data provided by the facial API
                  facialAPIResponse.result.forEach(async (result) => {
                    result.subjects.forEach(async (subject) => {
                      const name = subject.subject
                      const similarity = subject.similarity
  
                      if (similarity * 100 > 45) {
                        // This is passed state.
                        setMode("success")
                        setName(name)
                      } else {
                        setMode("fail")
                        console.log("Face found but similarity is not there.")
                      }
                    })
                  })

          
                } else {
                  setMode("fail")
                  console.log("Face matched but the API call failed.")
                }

              });

            }
          })
            console.log('getTracks', getTracks)
          }, 
        (error) => {
          console.log("Error accessing user media", error)
        })
      }

    enableCamera()

  })

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-2xl font-bold text-[#025EE1]" style={{ textShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'}}>PLEASE LOOK DIRECTLY AT THE CAMERA</p>
      <div className="relative flex flex-col">
        <img src={Ellipse} alt="" className="" />
        {showAnimation && <img src={FaceAnimation} alt="" className="absolute rounded-full w-52 ml-4 mt-12" />}
      </div>
    </div>
  )
}