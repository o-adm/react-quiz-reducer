import { useCallback, useEffect, useRef } from "react";

function NextButton({ dispatch, index, numQuestion, answer }) {
  const notAnswered = answer !== null;
  const btnNext = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (notAnswered && e.code === "Enter") {
        if (index < numQuestion - 1) {
          dispatch({ type: "nextQuestion" });
        } else if (index === numQuestion - 1) {
          dispatch({ type: "finish" });
        }
      }
    },
    [notAnswered, index, numQuestion, dispatch]
  );

  useEffect(() => {
    if (notAnswered) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, notAnswered]);

  if (answer === null) return null;

  if (index < numQuestion - 1) {
    return (
      <button
        className="btn btn--next"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }

  return (
    <button
      className="btn"
      onClick={() => dispatch({ type: "finish" })}
      ref={btnNext}
    >
      Finish
    </button>
  );
}

export default NextButton;
