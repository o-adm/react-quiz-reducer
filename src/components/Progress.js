function Progress({ index, numQuestion, answer, points, nbrPoints }) {
  return (
    <div className="progress margin-bottom-small">
      <progress
        value={index + Number(answer !== null)}
        max={numQuestion}
        className="progress-bar"
      ></progress>
      <div className="progress__value">
        <p>
          Question {index + 1} / {numQuestion}
        </p>
        <p>
          {points} / {nbrPoints}
        </p>
      </div>
    </div>
  );
}

export default Progress;
