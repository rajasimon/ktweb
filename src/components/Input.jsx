import { useRef, useState } from "react"

export const Input = ({ placeHolder, onChange }) => {

  const inputRef = useRef(null);
  
  const handleLabelClick = () => {
    inputRef.current.focus()
  }

  return (
    <div className="relative mt-6">
      <input type="email" ref={inputRef} placeholder={placeHolder} onChange={onChange} className="peer w-full border-b placeholder:text-transparent border-2 rounded-md h-12 border-gray-200 placeholder px-2" />
      <label onClick={handleLabelClick} htmlFor="email" className="absolute hover:cursor-text left-0 ml-2 -translate-y-3 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-3 peer-focus:ml-3 peer-focus:mb-2 peer-focus:-translate-y-3 peer-focus:px-3 peer-focus:text-[#025EE1] peer-focus:font-bold peer-invalid:font-bold">{placeHolder}</label>
    </div>
  )
}

