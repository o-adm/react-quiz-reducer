import { useEffect } from "react";

function Timer({ dispatch, remainingTime }) {
  const mins = Math.floor(remainingTime / 60);
  const secs = remainingTime % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "interval" });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <p className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </p>
  );
}

export default Timer;
