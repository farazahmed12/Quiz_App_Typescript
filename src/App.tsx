import React, { useState } from "react";

import QuestionCard from "./components/QuestionCard";
import Result from "./Result";
import { fetchQuizQuestions } from "./API";
import { QuestionState, Difficulty } from "./API";
import "./App.css";

const TOTAL_QUESTIONS = 5;

export type AnswerObject = {
  question: String;
  answer: String;
  correct: boolean;
  correctAnswer: String;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User Answer
      const answer = e.currentTarget.value;
      // Checking the answer against correct value
      const correct = questions[number].correct_answer === answer;
      // Add Score if correct
      if (correct) setScore((prev) => prev + 1);
      // Save Answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move onto Next Question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className="text-light container-fluid  test">
      <div className="container text-center py-2">
        <h1>React Quiz App</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <div>
            <button className="btn btn-secondary my-3" onClick={startTrivia}>
              Start Quiz
            </button>
          </div>
        ) : null}

        {!gameOver ? <p className="lead">Score: {score} </p> : null}

        {loading ? <p className="lead h3">Loading Questions ...</p> : null}

        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestion={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!loading &&
        !gameOver &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="btn btn-secondary my-4" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}

        {userAnswers.length === TOTAL_QUESTIONS ? (
          <Result score={score} totalQuestion={TOTAL_QUESTIONS} />
        ) : null}
      </div>
    </div>
  );
};

export default App;
