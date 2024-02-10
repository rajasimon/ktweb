import { useEffect, useRef, useState } from "react"

import avatar from "../../assets/avatar.svg"
import edcIcon from "../../assets/EDC_Icon.png"
import Arabic from "../../assets/language.svg"

import Button  from "../../components/Button"

import Instructions from "./instructions"
import Question from "./Question"
import Timer from "./Timer"
import {getCredentials} from "./utils"
import { useAuth } from "../../auth"

import {questionSetupsAPI, startExamAPI, updateQuestion, endStudentExamAPI} from "./api"
import { Link, useNavigate } from "react-router-dom"
import Violation from "./Violation"


const Test = () => {

  const [questionBank, setQuestionBank] = useState([]);

  const apInstance = useRef(null);
  const navigate = useNavigate()
  const [showImage, setShowImage] = useState(false)
  const [showViolation, setShowViolation] = useState(false)
  const [violationCode, setViolationCode] = useState(null)
  const [showImageContent, setShowImageContent] = useState(false)
  const [testMode, setTestMode] = useState('instructions')
  
  const [isProctor, setIsProctor] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)
  const [showAcceptButton, setShowAcceptButton] = useState(false)
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerID, setSelectedAnswerID] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showSubmit, setShowSubmit] = useState(false)
  const [examDetail, setExamDetail] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const handleAnswerSelected = (selectedAnswer) => {
    setSelectedAnswerID(selectedAnswer)
  };

  
  const handleNextClick = () => {
    // Call the update questoin to submit this answer.
    currentQuestion.studentAnswer = selectedAnswerID
    currentQuestion.studentExamId = examDetail.id
    delete currentQuestion["status"]
    updateQuestion(token, currentQuestion)
    
    if (currentQuestionIndex >= questionBank.length - 1) {
      setShowSubmit(true)
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswerID(0) 
    }
  }

  const handlePreviousClick = () => {
    setShowSubmit(false)
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitAllAnswers = async () => {
    setIsLoading(true)
    apInstance.current.stop() 
  }

  const currentQuestion = questionBank[currentQuestionIndex];

  const { token, userID, userName } = useAuth()

  const setupAutoPrctor = async () => {
    setIsLoading(true)

    const scriptsToLoad = 2;
    let loadedScripts = 0;

    const checkAllScriptsLoaded = async() => {
      if (loadedScripts == scriptsToLoad) {
        // All the scripts are loaded.

        const startExam = await startExamAPI(token, 1, userID)
        console.log("Exam started", startExam)
        setExamDetail(startExam)

        setIsProctor(true)
      }
    }

    const scriptCryptoJS = document.createElement("script");
    scriptCryptoJS.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
    scriptCryptoJS.async = true;
    document.body.appendChild(scriptCryptoJS);
    scriptCryptoJS.onload = () => {
      loadedScripts++
      checkAllScriptsLoaded()
      console.log('scriptCryptoJS is loaded')
    }
    
    const scriptAutoProctor = document.createElement("script");
    scriptAutoProctor.src = "https://cdn.autoproctor.co/autoproctor.3.0.3.min.js";
    scriptAutoProctor.async = true;
    document.body.appendChild(scriptAutoProctor);
    scriptAutoProctor.onload = () => {
      loadedScripts++
      checkAllScriptsLoaded()
      console.log('scriptAutoProctor is loaded')
    }
    
  }

  
  // Listen for proctor loaded and fetch all the exam questions then setup the proctor.
  useEffect(()=> {
    
    async function init() {
      if (isProctor) {
        const proctoringOptions = {
          trackingOptions: { 
              audio: true,
              numHumans: true,
              tabSwitch: true,
              photosAtRandom: false,
              detectMultipleScreens: true,
              forceFullScreen: false,
          },
          showHowToVideo: false,
        };
  
        const credentials = getCredentials(`${userName}-${examDetail.id}`);
        apInstance.current = new AutoProctor(credentials);
        await apInstance.current.setup(proctoringOptions)
        apInstance.current.start()
      }
    }

    init()

  }, [isProctor])


  const handleAutoProctorEvidenceEvent = (event) => {
    console.log('Event received from auto proctor evidence event', event)
    const evidenceCode = event.detail.evidenceCode

    if (!isLoading) {
      if (evidenceCode !== 5008) {
        setViolationCode(evidenceCode)
        setShowViolation(true)
      }
    }
  }

  const hanldeViolationAccept = () => {
    setShowViolation(false)
  }

  const handleAutoProctorMonitoringStarted = async (event) => {
    // Show questions once the auto proctor monitoring is started.
    console.log("AutoProctor Monitoring started")
    
    // ExamID comes from the startExam so 
    const questionsetups = await questionSetupsAPI(token, examDetail.id)
    setQuestionBank(questionsetups)
    setTestMode("questions")
    setIsLoading(false)
  }

  const handleAutoProctorMonitoringStopped = async () => {
    const getReport = await apInstance.current.getReport()
    localStorage.setItem('AutoProctorReport', JSON.stringify(getReport))

    const endStudentExamResp = await endStudentExamAPI(token, examDetail.id, userID)
    localStorage.setItem('KTReport', JSON.stringify(endStudentExamResp))
    
    navigate("/result")
  }
  

  useEffect(() => {
    window.addEventListener("apEvidenceEvent", handleAutoProctorEvidenceEvent)
    return () => {
      window.removeEventListener("apEvidenceEvent", handleAutoProctorEvidenceEvent)
    }
  }, [handleAutoProctorEvidenceEvent])


  useEffect(() => {
    window.addEventListener('apMonitoringStarted', handleAutoProctorMonitoringStarted)
    return () => {
      window.removeEventListener('apMonitoringStarted', handleAutoProctorMonitoringStarted)
    }
  }, [handleAutoProctorMonitoringStarted])

  useEffect(() => {
    window.addEventListener("apMonitoringStopped", handleAutoProctorMonitoringStopped)
    return () => {
      window.removeEventListener("apMonitoringStopped", handleAutoProctorMonitoringStopped)
    }
  })

  return (
    <div className="bg-[#F1F1F8]" id="testContainerId">
      {showImage && (
        <div>
          <div className="w-full h-full top-0 bg-[#00000080] backdrop-opacity-30 fixed"></div>
          <div className="fixed z-50 w-full flex p-16 h-full justify-center items-center" onClick={() => setShowImage(false)}>
            <img src={showImageContent} alt="" className="w-7/12 h-fit" />
          </div>
        </div>
      )}

      {showViolation && (
        <div>
          <div className="w-full h-full top-0 bg-[#00000080] backdrop-opacity-30 fixed"></div>
          <div className="fixed z-50 w-full flex p-4 md:p-16 h-full justify-center items-center" onClick={() => setShowImage(false)}>
            <Violation violationCode={violationCode} onAcceptViolation={hanldeViolationAccept} />
          </div>
        </div>
      )}
      
      <div className="px-5 md:px-24 h-full">
        <div className="flex pt-12 justify-between mb-5">
          <div className="flex w-full">
            <img src={avatar} alt="" />
            <p className="flex items-center pl-3 text-2xl font-semibold">{userName}</p>
          </div>
          <div>
            <img src={edcIcon} alt="" />
          </div>
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
            <div className="w-1/12 md:w-full invisible md:visible">
              {testMode === "instructions" && <p className="font-bold text-center text-2xl md:text-3xl">Test Instructions</p>}
              {testMode === "questions" && (
                <div className="z-10">
                  <p className="text-xl font-semibold">{currentQuestionIndex + 1}/{questionBank.length}</p>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-blue-600 shadow-sm h-4 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questionBank.length) * 100}%`}}></div>
                  </div>
                </div>
              )}
            </div>
            <div className="invinsible md:visible w-6/12 md:w-3/12">
              {testMode === "questions" && (
                <div className="flex flex-row justify-end">
                  <div className="h-12 w-1 bg-gray-200"></div>
                  <div className="pl-6">
                    <p className="text-gray-500">Time Left</p>
                    <Timer handleSubmitAllAnswers={handleSubmitAllAnswers} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {testMode === "instructions" && <Instructions showAcceptButton={showAcceptButton} isAccepted={isAccepted} setIsAccepted={setIsAccepted} />}
          {testMode === "questions" && <Question
            handleAnswerSelected={handleAnswerSelected} 
            currentQuestion={currentQuestion} 
            setShowImage={setShowImage} 
            setShowImageContent={setShowImageContent} />}

          {testMode === "instructions" && (
            <div className="py-6 px-4 md:px-12 bg-[#F5F5F5] rounded-b-2xl">
              <Button title="Confirm and Continue" isLoading={isLoading} onClick={() => isAccepted ? setupAutoPrctor() : setShowAcceptButton(true)} />
            </div>
          )}

          {testMode === "questions" && (
            <div className="py-6 px-4 md:px-12 bg-[#F5F5F5] rounded-b-2xl flex">
              <button className="px-4 py-2 w-52 h-10 hover:bg-[#EDF4FD] hover:border-[#025EE1] text-gray-900 border-2 rounded-lg" onClick={handlePreviousClick}>Previous</button>
              {showSubmit && (
                <div className="ml-10"><Button title="Submit All Answers" isLoading={isLoading} onClick={handleSubmitAllAnswers} /></div>
                )
              }
              {!showSubmit && (
                 <button className="ml-10 px-4 py-2 w-52 h-10 bg-[#025EE1] hover:bg-[#332A7C] text-white rounded-lg" onClick={handleNextClick}>Next</button>
              )}
              
            </div>
          )}

        </div>
        <div className="mt-10 mb-3 ml-11">
          <p className="text-[#CCC]">Copyright © 2024 Performise Labs, all rights reserved</p>
        </div>

      </div>
    </div>
  )   
}

export default Test