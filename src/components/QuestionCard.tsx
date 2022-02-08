import React from "react";

import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestion: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestion,
}) => {
  return (
    <div className="card bg-dark p-4">
      <p className="lead">
        Question: {questionNr} / {totalQuestion}{" "}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <ul className="list-group list-group-flush">
        {answers.map((answer, i) => (
          <li
            className={
              userAnswer?.correctAnswer === answer
                ? "list-group-item bg-success"
                : userAnswer?.answer === answer
                ? "list-group-item bg-danger"
                : "list-group-item bg-dark"
            }
            style={{ backgroundColor: "#3476e0" }}
            key={i}
          >
            <button
              className="btn lead text-light"
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
