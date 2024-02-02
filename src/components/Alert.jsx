import classNames from "classnames"

export const Alert = ({title, subtitle, icon, isDanger}) => {
  
  // By default grandiant are success 
  let gradiantFrom = "from-[#32BB71]"
  let gradiantTo = "to-[#037847]"

  if (isDanger) {
    gradiantFrom = "from-[#D26D43]"
    gradiantTo = "to-[#961F22]"
  } 

  const combinedClassNames = classNames(
    "flex", "p-6", "bg-gradient-to-r", gradiantFrom, gradiantTo, "gap-6", "rounded-xl"
  )

  return (
    <div className={combinedClassNames}>
      <div className="w-20">
        <img src={icon} alt="" />
      </div>
      <div>
        {title && <h1 className="text-white font-bold text-2xl">{title}</h1>}
        <p className="text-white text-sm">{subtitle}</p>
      </div>
    </div>
  )
} 