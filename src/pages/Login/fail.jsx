import EllipseWhite from "../../assets/Ellipse_white.png"
import { Alert } from "../../components/Alert"
import danger from "../../assets/danger.svg"


export const Fail = () => {
  console.log("Fail mode rendered")
  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-2xl font-bold text-[#E00]" style={{ textShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'}}>AUTHENTICATION FAILED</p>
      <img src={EllipseWhite} alt="" />
      <Alert icon={danger} isDanger={true} subtitle="Ensure your face is well-lit and unobstructed. Try again by looking directly at the camera. If the issue persists, consider adjusting your position or lighting conditions. If problems persist, please contact support for assistance." />
    </div>
  )
}
