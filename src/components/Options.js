function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="quiz__option">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn--quiz ${answer === index ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
