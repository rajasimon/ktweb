import classNames from "classnames"

import dangerSVG from "../../assets/danger.svg"

const Violation = ({onAcceptViolation, violationCode}) => {
  
  // By default grandiant are success 
  let gradiantFrom = "from-[#D26D43]"
  let gradiantTo = "to-[#961F22]"
  let violationMessage = ""

  const combinedClassNames = classNames(
    "flex", "w-4/12", "p-6", "bg-gradient-to-r", gradiantFrom, gradiantTo, "gap-6", "rounded-xl"
  )


  switch (violationCode) {
    case 5001:
      violationMessage = "No one looking at camera"
      break;
    case 5002:
      violationMessage = "More than 1 Person in Video"
    case 5003: 
      violationMessage = "Random photo taken"
    case 5004: 
      violationMessage = "Audio above background levels"
    case 5005: 
      violationMessage = "Document page hidden or focus lost"
    case 5006:
      violationMessage = "Document page became visible or focus was gained"
    case 5007:
      violationMessage = "Multiple monitors detected"
    case 5008:
      violationMessage = "Multiple monitors suspected (not a violation)"
    default:
      break;
  }

  return (
    <div className={combinedClassNames}>
      <div>
        <img src={dangerSVG} alt="" className="w-20" />
      </div>
      <div className="space-y-2">
        <h1 className="text-white font-bold text-2xl">VIOLATION ALERT</h1>
        <p className="text-white text-xl font-bold">{violationMessage}</p>
        <p className="text-white text-lg">
        You have received 1 out of 3 alerts. Please ensure you maintain focus on the screen to avoid further alerts. Three alerts will result in a test failure, and you may be banned from the test.
        </p>
        <div>
          <button className="px-4 py-2 mt-8 bg-white text-gray-700 font-semibold text-sm rounded-lg hover:bg-[#CCCCCC]" onClick={onAcceptViolation}>Acknowledge & Continue</button>
        </div>
      </div>
    </div>
  )
} 

export default Violation