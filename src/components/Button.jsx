import classNames from "classnames"

export const Button = ({ title, isFull, onClick, isLoading }) => {

  const width =  isFull ? 'w-full': 'w-full md:w-auto'

  const combinedClassNames = classNames(
    'px-4', 'py-2', 'bg-[#025EE1]', 'text-white', 'rounded-lg', width, "hover:bg-[#332A7C]"
  )
  
  return (  
    <button 
      className={combinedClassNames}
      onClick={onClick}
      disabled={isLoading}
    >
      <div className="flex">
        {isLoading && (
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <p className="w-full">{title}</p>
      </div>
    </button>
  )
}

export default Button