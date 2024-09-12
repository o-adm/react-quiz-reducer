function StartScreen({ dispatch }) {
  return (
    <div className="start__container">
      <h1 className="heading">Welcome to Quizzo</h1>
      <p className="paragraph margin-bottom-small">
        <span>Are You Ready?</span>
        <span>15 question to test your React mastery</span>
      </p>
      <button
        className="btn btn--purple"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
