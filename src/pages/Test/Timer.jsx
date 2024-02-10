import { useState, useEffect } from "react"

const Timer = ({ handleSubmitAllAnswers }) => {
  const initialTime = 900;
  const [time, setTime] = useState(initialTime);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} : ${remainingSeconds}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          // You can perform additional actions when the countdown reaches zero
          handleSubmitAllAnswers()
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <p className="text-xl md:text-3xl font-semibold text-sky-700">{formatTime(time)}</p>
  )
}

export default Timer;