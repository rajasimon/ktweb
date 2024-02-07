import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Ellipse from "../../assets/Ellipse.png"
import FaceAnimation from "../../assets/faceanimation.gif"
import { useAuth } from "../../auth"


export const Face = ({ setMode, setName, typeInput }) => {
  const [pictureTaken, setPictureTaken] = useState(false);

  const backendPath = import.meta.env.VITE_BACKEND_PATH
  const { token, login, logout } = useAuth()

  const videoRef = useRef()
  const photoRef = useRef()

  // const convertFrameToBlob = async (video) => {
  //   const canvas = document.createElement('canvas');
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;

  //   const ctx = canvas.getContext('2d');
  //   ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

  //   return new Promise((resolve) => {
  //     canvas.toBlob(blob => {
  //       resolve(blob);
  //     }, 'image/jpeg', 1);
  //   });
  // };

  const takepicture = async () => {
    const width = 640
    const height = 480
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, width, height);
    const data = canvas.toDataURL("image/png");
    photoRef.current.setAttribute("src", data);

    const convertFrameToBlob = async () => {
      return new Promise((resolve) => {
        canvas.toBlob(blob => {
          resolve(blob);
        }, 'image/jpeg', 1);
      });
    }
    
    const blob = await convertFrameToBlob()
    console.log(blob)
    facialAPI(blob, typeInput)
  }

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


    const facialAPIResponse = await response.json();

    if ("code" in facialAPIResponse) {
        console.log(facialAPIResponse.message)
        setMode("fail")
      }

      // Show pass/fail screen based on the data provided by the facial API
      facialAPIResponse.result.forEach(async (result) => {
        result.subjects.forEach(async (subject) => {
          const subjectList = subject.subject.split(",")

          const email = subjectList[0]
          const name = subjectList[1]
          const username = email.split("@")[0]
          if (email === typeInput) {
            setName(name)
            await authenticateAPI(username, name)
          } else {
            setMode("fail")
          }
        })
      })
  }

  const authenticateAPI = async (username, name) => (
    fetch(`${backendPath}/api/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"password": "admin", "username": username})
    }).then((res) => res.json()).then(response => {
        if ("id_token" in response) {
          login(response.id_token, typeInput, name)
          setMode("success")
        } else {
          setMode("fail")
          console.log("Face matched but the API call failed.")
        }
    })
  )

  // Get video feed from the camera and show it to the user
  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        videoRef.current.addEventListener("loadedmetadata", async () => {
          console.log("video is started playing")
          setTimeout(() => (
            console.log("waiting for 5 seconds to load the video"),
            takepicture(),
            stream.getTracks().forEach(track => track.stop()),
            setPictureTaken(true)
          ), 5000)
        })
      } catch (err) {
        console.log('Error occurred', err);
      }
    };
  
    enableCamera()
  }, [])

  // useEffect(()=> {
    
  //   async function enableCamera() {
  //     // Get Video and take the image call the facial API 
  //     navigator.getUserMedia({video:{ width:133, height:157 }}, 
  //       (stream) => {
  //         setShowAnimation(true)

  //         const getTracks = stream.getTracks();
  //         getTracks.forEach(async (tracks) => {
  //           if (tracks.kind === "video") {

  //             const video = document.createElement("video");
  //             video.srcObject = stream;

  //             setTimeout(() => console.log("waiting for 2 seconds to load the vide0"), 2000)

  //             video.addEventListener("loadedmetadata", async () => {
  //               videoRef.current.srcObject = stream
  //               videoRef.current.play();

  //               // Wait for another 2 seconds
                
  //               const blob = await convertFrameToBlob(video)
  //               console.log(blob)

  //               const facialAPIResponse = await facialAPI(blob, typeInput)

  //               if ("code" in facialAPIResponse) {
  //                 console.log(facialAPIResponse.message)
  //                 // setMode("fail")
  //               }

  //               // Show pass/fail screen based on the data provided by the facial API
  //               facialAPIResponse.result.forEach(async (result) => {
  //                 result.subjects.forEach(async (subject) => {
  //                   const name = subject.subject
  //                   const similarity = subject.similarity

  //                   if (similarity * 100 > 45) {
  //                     // This is passed state.
  //                     // setMode("success")
  //                     // setName(name)
  //                   } else {
  //                     // setMode("fail")
  //                     console.log("Face found but similarity is not there.")
  //                   }
  //                 })
  //               })
                
  //               // // Also call authentication API here.
  //               // const response = await authenticateAPI()
  //               // if ("id_token" in response) {
  //               //   login(response.id_token, typeInput, typeInput)

          
  //               // } else {
  //               //   setMode("fail")
  //               //   console.log("Face matched but the API call failed.")
  //               // }

  //             });

  //           }
  //         })
  //           console.log('getTracks', getTracks)
  //         }, 
  //       (error) => {
  //         console.log("Error accessing user media", error)
  //       })
  //     }

  //   enableCamera()

  // })

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-2xl font-bold text-[#025EE1]" style={{ textShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'}}>PLEASE LOOK DIRECTLY AT THE CAMERA</p>
      <div className="flex flex-col items-center">
        {!pictureTaken && <video className="rounded-lg" autoPlay ref={videoRef}></video>}
        <img className="rounded-lg" ref={photoRef} />
        {!pictureTaken && <p>Taking picture in 5 seconds...</p>}
      </div>
    </div>
  )
}