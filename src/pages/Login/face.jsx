import { useEffect, useRef, useState } from "react"

import { useAuth } from "../../auth"

export const Face = ({ setMode, setName, typeInput }) => {
  const [pictureTaken, setPictureTaken] = useState(false);
  const [takePicture, setTakePicture] = useState(false) 
  const [timeoutSeconds, setTimeoutSeconds] = useState(null);
  const [dataURL, setDataURL] = useState(null);
  const [showWarning, setShowWarning] = useState(true);
  const [showLoading, setShowLoading] = useState(false)


  const { token, login, logout } = useAuth()

  const videoRef = useRef()
  const photoRef = useRef(null)

  const handleTakePicture = async () => {
    const width = 640
    const height = 480
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, width, height);
    const data = canvas.toDataURL("image/png");
    setPictureTaken(true)
    setDataURL(data)

    const convertFrameToBlob = async () => {
      return new Promise((resolve) => {
        canvas.toBlob(blob => {
          resolve(blob);
        }, 'image/jpeg', 1);
      });
    }
    
    const blob = await convertFrameToBlob()
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
          if (subject.similarity * 100 > 75) {
            const subjectList = subject.subject.split(",")
            const email = subjectList[0]
            const name = subjectList[1]

            const splittedEmail = email.split("@")
            const identifyName = splittedEmail[0]

            if (identifyName === typeInput) {
              // success
              login(token, typeInput, name)
              setName(name)
              setMode("success")
            } else {
              setMode("fail")
            }
          } else {
            setMode("fail")
          }
        })
      })
  }

  // Get video feed from the camera and show it to the user
  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {width: 640, height: 480} });
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        videoRef.current.addEventListener("loadedmetadata", async () => {
          console.log("video is started playing")
          setTakePicture(true)
        })
      } catch (err) {
        console.log('Error occurred', err);
      }
    };
  
    enableCamera()
  }, [])

  // Take picture from the video feed
  useEffect(() => {
    let timerId;

    if (takePicture) {
      setShowWarning(false)
      
      // Start countdown
      let secondsLeft = 5; // Change this value as needed
      setTimeoutSeconds(secondsLeft);
      timerId = setInterval(() => {
        secondsLeft--;
        setTimeoutSeconds(secondsLeft);
        if (secondsLeft === 0) {
          clearInterval(timerId);
          setTakePicture(false);
          setTimeoutSeconds(null);
          handleTakePicture()
        }
      }, 1000);
    }

    return () => clearInterval(timerId); // Cleanup on unmount or state change
  }, [takePicture]);

  useEffect(() => {
    if (dataURL) {
      photoRef.current.setAttribute("src", dataURL);
      setShowLoading(true)
    }
  }, [dataURL])

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <p className="text-2xl font-bold text-[#025EE1]" style={{ textShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'}}>PLEASE LOOK DIRECTLY AT THE CAMERA</p>
      <div className="relative flex flex-col items-center p-10 border-2 border-dashed border-[#505050] rounded-lg w-11/12 h-96">
        {!pictureTaken && (
          <div className="w-full h-full overflow-hidden rounded-lg">
            <video className="w-full h-full object-cover" autoPlay muted playsinline ref={videoRef}></video>
          </div>
        )}
        {pictureTaken && <img className="rounded-lg w-full h-full object-cover" ref={photoRef} />}
      </div>
      {timeoutSeconds && <p className="text-xl text-red-500">Taking picture in {timeoutSeconds} seconds...</p>}
      {showWarning && <p className="text-xl text-red-500">Adjust your posture</p>}
      {showLoading && <p className="text-xl text-green-500">Loading...</p>}
    </div>
  )
}