import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div className="quiz__container margin-bottom-medium">
      <h4 className="quiz__question">{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
