import { useEffect, useReducer } from "react";
import Error from "./Error";
import Loading from "./Loading";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Section from "./Section";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: Number(localStorage.getItem("highscore")) || 0,
  remainingTime: null,
};

const SEC_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataError":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainingTime: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const curr = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          curr.correctOption === action.payload
            ? state.points + curr.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      const newScore = Math.max(state.points, state.highscore);
      localStorage.setItem("highscore", newScore);

      return {
        ...state,
        status: "finish",
        highscore: newScore,
      };
    case "interval":
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
        status: state.remainingTime === 0 ? "finish" : state.status,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    default:
      throw new Error("Unknown Action!");
  }
}

const API_URL = "https://react-quiz-reducer.vercel.app/";

function Quizz() {
  const [
    { questions, status, index, answer, points, highscore, remainingTime },
    dispatch,
  ] = useReducer(reducer, initialState);

  const nbrPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  const numQuestion = questions.length;

  useEffect(function () {
    async function fetchQuestions() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await fetch(`${API_URL}/data/questions.json`);
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataError" });
      } finally {
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="container">
      {status === "loading" && <Loading />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen dispatch={dispatch} />}
      {status === "active" && (
        <>
          <Section className="section-quiz">
            <Progress
              index={index}
              answer={answer}
              numQuestion={numQuestion}
              points={points}
              nbrPoints={nbrPoints}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
              numQuestion={numQuestion}
            />
            <div className="action">
              <Timer dispatch={dispatch} remainingTime={remainingTime} />
              <NextButton
                dispatch={dispatch}
                index={index}
                numQuestion={numQuestion}
                answer={answer}
              />
            </div>
          </Section>
        </>
      )}
      {status === "finish" && (
        <FinishScreen
          points={points}
          nbrPoints={nbrPoints}
          highscore={highscore}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default Quizz;
