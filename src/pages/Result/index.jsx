import { useEffect, useState } from "react"

import { useAuth } from "../../auth"

const CircleSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="201" height="200" viewBox="0 0 201 200" fill="none">
    <circle cx="99.4267" cy="98.5185" r="73.5556" stroke="#00B154" strokeWidth="4" strokeDasharray="1 6"/>
    <circle cx="99.4261" cy="98.5185" r="71.8518" fill="#F8F8F8"/>
    <g filter="url(#filter0_d_851_2157)">
      <circle cx="99.6489" cy="98.5185" r="60.7407" fill="white"/>
    </g>
    <path d="M200.908 100C200.908 155.228 156.137 200 100.908 200C45.6797 200 0.908203 155.228 0.908203 100C0.908203 44.7715 45.6797 0 100.908 0C156.137 0 200.908 44.7715 200.908 100ZM20.9082 100C20.9082 144.183 56.7254 180 100.908 180C145.091 180 180.908 144.183 180.908 100C180.908 55.8172 145.091 20 100.908 20C56.7254 20 20.9082 55.8172 20.9082 100Z" fill="#F5F5F5"/>
    <defs>
      <filter id="filter0_d_851_2157" x="18.9082" y="21.7778" width="161.482" height="161.481" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="10"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_851_2157"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_851_2157" result="shape"/>
      </filter>
    </defs>
  </svg>
)

const ProgressSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="199" height="199" viewBox="0 0 199 199" fill="none">
    <path d="M91.6961 10.3297C91.2188 4.86225 95.2698 -0.012167 100.758 0.0561637C118.26 0.274106 135.456 5.13348 150.561 14.2223C168.515 25.0256 182.593 41.2499 190.777 60.5699C198.962 79.8898 200.832 101.314 196.12 121.771C191.408 142.228 180.356 160.668 164.548 174.448C148.74 188.228 128.987 196.641 108.121 198.481C87.2549 200.321 66.3464 195.493 48.3922 184.69C30.438 173.887 16.36 157.662 8.17577 138.342C1.28665 122.08 -1.12867 104.326 1.0897 86.9135C1.78258 81.4749 7.16578 78.1419 12.5069 79.3751C17.8407 80.6067 21.1003 85.9293 20.5426 91.3758C19.1807 104.676 21.1821 118.163 26.4359 130.565C32.9833 146.021 44.2457 159 58.6091 167.643C72.9724 176.286 89.6992 180.148 106.392 178.676C123.085 177.204 138.887 170.474 151.534 159.45C164.18 148.425 173.022 133.673 176.791 117.308C180.561 100.942 179.065 83.8031 172.517 68.3471C165.97 52.8911 154.707 39.9117 140.344 31.269C128.835 24.3436 115.807 20.4876 102.496 19.9861C97.0086 19.7794 92.1737 15.8002 91.6961 10.3297Z" fill="url(#paint0_linear_835_2104)"/>
    <defs>
    <linearGradient id="paint0_linear_835_2104" x1="11.2058" y1="106.721" x2="147.124" y2="19.1114" gradientUnits="userSpaceOnUse">
      <stop stopColor="#037847"/>
      <stop offset="1" stopColor="#43D590"/>
    </linearGradient>
    </defs>
  </svg>
)


const Result = () => {

  const [testDate, setTestDate] = useState(null)
  const [duration, setDuration] = useState(null)
  const [deviceType, setDeviceType] = useState(null)
  const [trustScore, setTrustScore] = useState(null)
  const [violationDetected, setViolationDetected] = useState(0)
  const [faceViolation, setFaceViolation] = useState(0)
  const [noiseViolation, setNoiseViolation] = useState(0)
  const [tabSwitched, setTabSwitched] = useState(0)

  const {token, login, logout, userID, userName } = useAuth()


  // Update the state with the result from the localStorage
  useEffect(() => {
    const ktReport = JSON.parse(localStorage.getItem("KTReport"))
    const autoProctorReport = JSON.parse(localStorage.getItem("AutoProctorReport"))

    console.log(autoProctorReport)

    // Process KTReport
    const startDate = new Date(ktReport.startDate)
    const endDate = new Date(ktReport.endDate)
    const timeDifference = Math.abs(startDate.getTime() - endDate.getTime());
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    
    setTestDate(startDate.toDateString())
    setDuration(`${minutes}m: ${seconds}`)
    
    // Process AutoProctor Report
    setTrustScore(autoProctorReport.attemptDetails.trustScore * 100)
    setDeviceType(autoProctorReport.attemptDetails.device)
    setViolationDetected(autoProctorReport.reportData.all_evidences.length)

    if (autoProctorReport.reportData.all_evidences.length > 0) {
      for (const evidence in autoProctorReport.reportData.all_evidences) {
        const evidenceReport = autoProctorReport.reportData.all_evidences[evidence]
        if (evidenceReport) {
          if (evidenceReport.label === "noise-detected") {
            setNoiseViolation(noiseViolation + 1)
          }
        }
      }
    }
  }, [])

  return (
    <div className="h-screen bg-[#F1F1F8]">
      <div className="px-24 h-screen">
        <div className="flex pt-12 justify-between mb-5">
          <div className="flex w-full">
            <img src="/src/assets/avatar.svg" alt="" />
            <p className="flex items-center pl-3 text-2xl font-semibold">
              {userName}
            </p>
          </div>
          <div><img src="/src/assets/EDC_Icon.png" alt="" /></div>
        </div>
        <div className="w-full h-4/5 bg-white rounded-t-2xl rounded-b-2xl">
          <div className="py-6 px-12 bg-[#F5F5F5] rounded-t-2xl flex">
            <div className="w-3/12">
              <p className="text-gray-400 font-semibold">Switch Language</p>
              <div className="flex flex-row space-x-2">
                <img src="/src/assets/language.svg" alt="" height="16" width="32" />
                <p>Arabic</p>
              </div>
            </div>
            <div className="grow">
              <p className="font-bold text-center text-3xl">Test Result</p>
            </div>
            <div className="w-3/12"></div>
          </div>
          
          <div className="py-6 px-12 h-4/5 overflow-scroll overflow-x-hidden">
            <p className="text-xl font-bold capitalize text-center">You have completed the test, here is your test result</p>

            <div className="w-full flex items-center justify-center">
              <div className="flex flex-row py-9 w-8/12">
                <div className="w-6/12 flex flex-col px-12 items-center">
                  <div className="flex relative">
                    <CircleSVG />
                    <div className="absolute">
                      <div className="absolute inset-8 flex flex-col items-center justify-center">
                        <div className="font-bold text-2xl text-green-800">
                          80%
                        </div>
                        <div className="font-bold text-2xl text-green-800">
                          Passed
                        </div>
                      </div>
                      <ProgressSVG />
                    </div>
                  </div>
                  <div className="py-8 space-y-4">
                    <p className="text-xl">Student Name: <span className="font-bold">{userName}</span></p>
                    <p className="text-xl">Student ID: <span className="font-bold ml-3">{userID}</span></p>
                    <p className="text-xl">Test Date: <span className="font-bold ml-6">{testDate}</span></p>
                    <p className="text-xl">Duration: <span className="font-bold ml-8">{duration}</span></p>
                    <p className="text-xl">Device Type: <span className="font-bold">{deviceType}</span></p>
                  </div>
                </div>
                <div className="w-6/12 flex flex-col px-12 items-center">
                  <div className="flex relative">
                    <CircleSVG />
                    <div className="absolute">
                      <div className="absolute inset-8 flex flex-col items-center justify-center">
                        <div className="font-bold text-2xl text-green-800">
                          {trustScore}
                        </div>
                        <div className="font-bold text-2xl text-green-800">
                          Trust
                        </div>
                      </div>
                      <ProgressSVG />
                    </div>
                  </div>
                  <div className="py-8 space-y-4">
                    <p className="text-xl"><span className="font-bold">{violationDetected}</span> Violations Detected</p>
                    <p className="text-xl">Face Violation: <span className="font-bold">2 times</span></p>
                    <p className="text-xl">Noise Violation: <span className="font-bold">{noiseViolation} times</span></p>
                    <p className="text-xl">Tab Switched: <span className="font-bold">0 times</span></p>
                    <p className="text-xl">Tracking </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <div className="py-6 px-12 bg-[#F5F5F5] rounded-b-2xl">
            <p className="text-center text-2xl"><span className="font-bold capitalize">THANK YOU</span> <span className="text-gray-800">and all the best in your driving license journey</span></p>
          </div>
        </div>
        <div className="fixed bottom-0 mb-3 ml-11">
          <p className="text-[#CCC]">
            Copyright © 2024 Performise Labs, all rights reserved
          </p>
        </div>
      </div>
    </div>

  )
}

export default Result