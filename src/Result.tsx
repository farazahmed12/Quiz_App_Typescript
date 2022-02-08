import React from "react";

type Props = {
  score: number;
  totalQuestion: number;
};

const Result: React.FC<Props> = ({ score, totalQuestion }) => {
  const totalscore = score - totalQuestion;
  return (
    <div className="card bg-dark mt-5">
      <div className="card-body">
        <h3 className="card-subtitle mb-2 text-muted">Result</h3>
        <p className="h6">Your Total Score is : {score}</p>
        <p>
          Wrong Answers : {totalscore < 0 ? totalscore * -1 : totalscore * 1}
        </p>
      </div>
    </div>
  );
};

export default Result;
