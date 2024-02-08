import { useEffect, useRef, useState } from "react"

const Instructions = ({showAcceptButton, isAccepted, setIsAccepted}) => {

  const checkboxRef = useRef()
  
  useEffect(() => {
    if (showAcceptButton) {
      checkboxRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }
  }, [showAcceptButton])
  
  return (
    <div className="py-6 px-4 md:px-12 h-4/5 overflow-scroll overflow-x-hidden">
      <div className="prose max-w-none text-[#535353]">
        <h2>Integrity Guidelines</h2>
        <ul>
          <li>
            Commit to maintaining integrity throughout the exam by refraining from having others in the camera view
          </li>
          <li>
          Understand that violations may result in consequences such as a temporary ban, exam failure, and the need to repeat the exam, incurring additional fees
          </li>
        </ul>

        <h2>System Monitoring</h2>
        <ul>
          <li>Acknowledge that the system monitors your camera and mic during the test</li>
          <li>Ensure that the system is granted access to both the camera and microphone when the test loads</li>
        </ul>

        <h2>Face Detection</h2>
        <ul>
          <li>Understand that the test will not load if the system cannot detect your face at the beginning</li>
          <li>Be aware that the system captures the first photo once your face is detected</li>
        </ul>

        <h2>Violation Events</h2>
        <ul>
          <li>Recognize that the system considers certain actions as violations, such as switching to a different tab or application during the test.</li>
          <li>Understand that if the camera cannot see your face, the system will take a photo and store it for later review.</li>
        </ul>
        <h2>Test Environment</h2>
        <ul>
          <li>Take the test in a well-lit room; a dark room may prevent proper monitoring</li>
          <li>Ensure that only you are looking at the test, and there are no other individuals in the camera view</li>
          <li>Maintain a plain background without excessive objects or bright light sources</li>
        </ul>
        <h2>Noise and Interruptions</h2>
        <ul>
          <li>Take the test in a quiet environment to avoid recording any detected noise</li>
          <li>Ensure that only you are looking at the test, and there are no other individuals in the camera view</li>
        </ul>
        <h2>Test Completion</h2>
        <ul>
          <li>Finish the test without switching to other screens like Google or other applications</li>
          <li>Understand that your teacher will receive a report of your test performance, including detected violations</li>
        </ul>
        <h2>Trust Score</h2>
        <ul>
          <li>Be aware that the system calculates a trust score based on the number of violations detected</li>
          <li>Strive for a better trust score by minimizing violations during the test</li>
        </ul>
      </div>
      <div className="flex items-cente mt-8 mb-20" ref={checkboxRef}>
        <input type="checkbox" defaultChecked={isAccepted} onChange={() => setIsAccepted((state) => !state)} value="" className="w-9 h-9 rounded-2xl" />
        <label className="ms-2 text-xl font-bold text-gray-700">By confirming all point, you actively commit and agree to comply with these enhanced instructions. Non-compliance may lead to consequences such as a temporary ban, exam failure, and the need to repeat the exam with additional fees.</label>
      </div>
    </div>
  )
}

export default Instructions