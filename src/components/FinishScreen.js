function FinishScreen({ points, nbrPoints, highscore, dispatch }) {
  const perc = (points / nbrPoints) * 100;

  let emoji;
  if (perc === 100) {
    emoji = "💯";
  }
  if (perc > 80 && perc < 100) {
    emoji = "🥇";
  }
  if (perc >= 50 && perc < 80) {
    emoji = "⭐";
  }
  if (perc > 0 && perc < 50) {
    emoji = "😏";
  }
  if (perc === 0) {
    emoji = "🥲";
  }

  return (
    <div className="status quiz-finish">
      <div className="score">
        <span>{emoji}</span> You score {points} out of {nbrPoints} (
        {Math.ceil(perc)}
        %)
      </div>
      <p className="highscore">(Highscore : {highscore} points)</p>
      <button className="btn" onClick={() => dispatch({ type: "restart" })}>
        Restart
      </button>
    </div>
  );
}

export default FinishScreen;
