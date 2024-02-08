import { useState, useEffect } from "react"

const Question = ({currentQuestion, setShowImage, setShowImageContent, handleAnswerSelected}) => {
  const [radio, setRadio] = useState(null)

  const [imageDataURL, setImageDataURL] = useState(null);


  const handleAnswerClick = (radioIndex) => {
    setRadio(radioIndex)
    handleAnswerSelected(radioIndex)
  }

  const handleImageClick = () => {
    setShowImage(true)
    setShowImageContent(imageDataURL)
  }

  useEffect(() => {
    const fetchBlobImage = async () => {
      try {
        // Convert text data to binary data (Uint8Array)
        const binaryData = Uint8Array.from(atob(currentQuestion.image), c => c.charCodeAt(0));

        // Create a Blob from the binary data
        const blob = new Blob([binaryData], { type: 'image/jpeg' }); // Set the appropriate content type

        // Convert blob to URL
        const url = URL.createObjectURL(blob);

        // Set the URL in the state
        setImageDataURL(url);
        setRadio(null)
      } catch (error) {
        console.error('Error fetching blob image:', error);
      }
    };

    // Call the function to fetch the image blob
    fetchBlobImage();

    // Clean up the URL when the component unmounts
    return () => URL.revokeObjectURL(imageDataURL);
  }, [currentQuestion.id]); // Empty dependency array ensures the effect runs only once on mount


  return (
    <div className="py-6 px-4 md:px-12 h-4/5 flex flex-col">
      <div className="h-64 flex">
        <div className="w-full md:w-9/12 space-y-4">
          <p className="text-[#A4A4A4] font-semibold">Question: {currentQuestion.id}</p>
          <p className="text-3xl text-[#505050]">{currentQuestion.name.question}</p>
          <p className="text-[#A4A4A4] font-semibold">Select only one correct answer</p>
        </div>
        <div className="w-3/12 hidden md:block">
          <img src={imageDataURL} alt="" className="rounded-2xl" onClick={handleImageClick} style={{width: "408px", height: "229px"}} />
          <p className="text-[#A4A4A4] font-bold text-lg text-center">Click on image to zoom</p>
        </div>
      </div>
      <div className="w-full md:hidden">
        <img src={imageDataURL} alt="" className="rounded-2xl" onClick={handleImageClick} style={{width: "408px", height: "229px"}} />
        <p className="text-[#A4A4A4] font-bold text-lg text-center">Click on image to zoom</p>
      </div>

      <div className="h-1 w-full bg-slate-100"></div>
      
      <div>
        {currentQuestion.name.answers.map((answer) => (
          <div 
            key={answer.id}
            className="h-20 flex mt-4 border rounded-2xl cursor-pointer hover:bg-[#EDF4FD] hover:border-[#025EE1]" 
            style={{borderColor: radio === answer.index ? "#025EE1": "#CCCCCC"}} 
            onClick={() => handleAnswerClick(answer.index)} 
            data-radio={answer.index}
          >
            <div className="px-12 py-6">
              <div className="flex">
                <input type="radio" className="w-6 h-6" name="" id="" checked={radio === answer.index} onChange={() => handleAnswerClick(answer.index)} />
                <p className="text-lg text-[#505050] md:text-xl ml-3">{answer.description}</p>
              </div>
            </div>
            <div className="grow"></div>
            {radio === answer.index && <div className="h-20 w-10 bg-[#025EE1] rounded-r-2xl"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Question