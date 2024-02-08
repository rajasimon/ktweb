import classNames from "classnames"

export const Button = ({ title, isFull, onClick }) => {

  const width =  isFull ? 'w-full': 'w-auto'

  const combinedClassNames = classNames(
    'px-4', 'py-2', 'bg-[#025EE1]', 'text-white', 'rounded-lg', 'w-full', 'md:w-auto', "hover:bg-[#332A7C]"
  )
  
  return (  
    <button 
      className={combinedClassNames}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button