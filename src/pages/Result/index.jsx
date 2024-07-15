import { useEffect, useState, useCallback } from "react"

import laptopSVG from "../../assets/images/laptop.svg"
import fullscreenSVG from "../../assets/images/fullscreen.svg"
import screenShareSVG from "../../assets/images/screen_share.svg"
import micSVG from "../../assets/images/Mic.svg"
import videocamSVG from "../../assets/images/video_cam.svg"
import watchSVG from "../../assets/images/watch.svg"
import Arabic from "../../assets/language.svg"
import { useAuth } from "../../auth"
import { Link } from "react-router-dom"


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

const ProgressSVG = ({ progressPercentage, gradientColor1, gradientColor2 }) => {
  console.log("gradientColor1, gradientColor2", gradientColor1, gradientColor2);
  return (
    <div className="flex items-center justify-center">
      <svg className="transform -rotate-90 w-72 h-72" style={{marginLeft: "-45px", marginTop: "-44px"}}>
        <defs>
          <linearGradient id={`${gradientColor1}${gradientColor2}`} gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={gradientColor1} />
            <stop offset="100%" stopColor={gradientColor2} />
          </linearGradient>
        </defs>
        <circle cx="145" cy="145" r="90" stroke="#F8F8F8" strokeWidth="20" fill="transparent" />
        <circle cx="145" cy="145" r="90" stroke={gradientColor1} stroke-linecap="round" strokeWidth="20" fill="transparent"
          strokeDasharray="565.714285714"
          strokeDashoffset={565.714285714 - progressPercentage / 100 * 565.714285714}
          style={{ stroke: `url(#${gradientColor1}${gradientColor2})` }}
        />
      </svg>
    </div>
  )
}


const Result = () => {

  const [testDate, setTestDate] = useState(null)
  const [duration, setDuration] = useState(null)
  const [deviceType, setDeviceType] = useState(null)
  const [trustScore, setTrustScore] = useState(null)
  const [resultPercentage, setResultPercentage] = useState(null)
  const [resultStatus, setResultStatus] = useState(null)
  const [violationCount, setViolationCount] = useState({
    total: 0,
    face: 0,
    noise: 0,
    tab: 0

  })

  const ktReport = JSON.parse(localStorage.getItem("KTReport"))
  const autoProctorReport = JSON.parse(localStorage.getItem("AutoProctorReport"))
  const {token, login, logout, userID, userName } = useAuth()

  useEffect(() => {
    const startDate = new Date(ktReport.startDate)
    const endDate = new Date(ktReport.endDate)
    const timeDifference = Math.abs(startDate.getTime() - endDate.getTime());
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTestDate(startDate.toDateString())
    setDuration(`${minutes}m: ${seconds}s`)
    setResultPercentage(ktReport.resultPercentage)
    setResultStatus(ktReport.result)

    // Process AutoProctor Report
    setTrustScore(autoProctorReport.attemptDetails.trustScore * 100)
    setDeviceType(autoProctorReport.attemptDetails.device)

    let noiseCount = 0
    let tabCount = 0
    let faceCount = 0
    let totalCount = 0
    if (autoProctorReport.reportData.evidence.length > 0) {
      autoProctorReport.reportData.evidence.forEach(evidenceReport => {
        
        if (!Array.isArray(evidenceReport)) {
          console.log(evidenceReport)
          if (evidenceReport) {
            switch (evidenceReport.label) {
              case "noise-detected":
                noiseCount++
                totalCount++
                break;
              case "tab-switch":
                tabCount++ 
                totalCount++
                break;
              case "no-face-looking-at-camera":
                faceCount++ 
                totalCount++
                break;
              case "multiple-faces-detected":
                faceCount++
                totalCount++
                break;
              default:
                break;
            }
          }
        }
      });
    }

    setViolationCount((prevDict) => ({
      ...prevDict, 
      ["total"]: totalCount,
      ["noise"]: noiseCount,
      ["tab"]: tabCount,
      ["face"]: faceCount,
    }));
  }, []);

  return (
    <div className="h-full md:h-screen bg-[#F1F1F8]">
      <div className="px-4 md:px-24 h-full md:h-screen">
        <div className="flex pt-12 justify-between mb-5">
          <div className="flex w-full">
            <img src="/src/assets/avatar.svg" alt="" />
            <p className="flex items-center pl-3 text-2xl font-semibold">
              {userName}
            </p>
            <Link to={"/logout"} className="underline flex items-center ml-4">Logout</Link>
          </div>
          <div><img src="/src/assets/EDC_Icon.png" alt="" /></div>
        </div>
        <div className="w-full h-4/5 bg-white rounded-t-2xl rounded-b-2xl border-2 shadow-md">
          <div className="py-6 px-4 md:px-12 bg-[#F5F5F5] rounded-t-2xl flex">
            <div className="w-8/12 md:w-3/12">
              <p className="text-gray-400 font-semibold">Switch Language</p>
              <div className="flex flex-row space-x-2">
                <img src={Arabic} alt="" height={16} width={32} />
                <p>Arabic</p>
              </div>
            </div>
            <div className="grow">
              <p className="font-bold text-center text-xl md:text-3xl">Test Result</p>
            </div>
            <div className="hidden md:block w-3/12"></div>
          </div>
          
          <div className="py-6 px-4 md:px-12 h-4/5 overflow-scroll overflow-x-hidden">
            <p className="text-xl font-bold capitalize text-center">You have completed the test, here is your test result</p>

            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col md:flex-row py-9 w-full md:w-8/12">
                <div className="w-full md:w-6/12 flex flex-col px-12 items-center">
                  <div className="flex relative">
                    <CircleSVG />
                    <div className="absolute">
                      <div className="absolute flex flex-col items-center justify-center" style={{width: "201px", height: "200px"}}>
                        <div className="font-bold text-2xl" style={{color: resultStatus === "PASSED" ? "#037847" : "#B70101"}}>
                          {Math.floor(resultPercentage)}%
                        </div>
                        <div className="font-bold text-2xl" style={{color: resultStatus === "PASSED" ? "#037847" : "#B70101"}}>
                          {resultStatus}
                        </div>
                      </div>
                      <ProgressSVG 
                        progressPercentage={resultPercentage} 
                        gradientColor1={resultStatus === "PASSED" ? "#037847" : "#A90000"}
                        gradientColor2={resultStatus === "PASSED" ? "#43D590" : "#FF0000"}
                       />
                    </div>
                  </div>
                  <div className="py-8 space-y-4">
                    <p className="text-xl">Student Name: <span className="font-bold">{userName}</span></p>
                    <p className="text-xl">Student ID: <span className="font-bold ml-3">{userID}</span></p>
                    <p className="text-xl">Test Date: <span className="font-bold ml-6">{testDate}</span></p>
                    <p className="text-xl">Duration: <span className="font-bold ml-8">{duration}</span></p>
                    <div className="flex flex-row">
                      <p className="text-xl">Device Type:</p>
                      <div className="flex flex-row ml-3">
                        <img src={laptopSVG} alt="" />
                        <span className="font-bold ml-3">{deviceType}</span>
                      </div> 
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 flex flex-col px-12 items-center">
                  <div className="flex relative">
                    <CircleSVG />
                    <div className="absolute">
                      <div className="absolute flex flex-col items-center justify-center" style={{width: "201px", height: "200px"}}>
                        <div className="font-bold text-2xl text-green-800 text-center" style={{color: trustScore >= 75 ? "#004AB4" : "#B70101"}}>
                          {Math.floor(trustScore)}%
                        </div>
                        <div className="font-bold text-2xl text-green-800 text-center" style={{color: trustScore >= 75 ? "#004AB4" : "#B70101"}}>
                          Trust
                        </div>
                      </div>
                      <ProgressSVG 
                        progressPercentage={trustScore} 
                        gradientColor1={trustScore >= 75 ? "#004AB4" : "#A90000"}
                        gradientColor2={trustScore >= 75 ? "#62A3FF" : "#FF0000"}
                      />
                    </div>
                  </div>
                  <div className="py-8 space-y-4">
                    <p className="text-xl"><span className="font-bold">{violationCount.total}</span> Violations Detected</p>
                    <p className="text-xl">Face Violation: <span className="font-bold">{violationCount.face} times</span></p>
                    <p className="text-xl">Noise Violation: <span className="font-bold">{violationCount.noise} times</span></p>
                    <p className="text-xl">Tab Switched: <span className="font-bold">{violationCount.tab} times</span></p>
                    <div className="flex flex-row space-x-4">
                      <p className="text-xl">Tracking</p>
                      <img src={laptopSVG} alt="" /> 
                      <img src={fullscreenSVG} alt="" />
                      <img src={screenShareSVG} alt="" />
                      <img src={micSVG} alt="" />
                      <img src={videocamSVG} alt="" />
                      <img src={watchSVG} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <div className="py-6 px-4 md:px-12 bg-[#F5F5F5] rounded-b-2xl">
            <p className="text-center text-lg md:text-2xl"><span className="font-bold capitalize">THANK YOU</span> <span className="text-gray-800">and all the best in your driving license journey</span></p>
          </div>
        </div>
        <div className="mt-10 mb-3 ml-11">
          <p className="text-[#CCCCCC]">Copyright © 2024 Performise Labs, all rights reserved</p>
        </div>
      </div>
    </div>

  )
}

export default Result
