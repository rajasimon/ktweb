const Instructions = () => {
  return (
    <div className="py-6 px-12 h-4/5 overflow-scroll overflow-x-hidden">
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
      </div>
    </div>
  )
}

export default Instructions