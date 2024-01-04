import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import { Question } from './Question'

export const Quizz = () => {
  const [questions, setQuestions] = useState([]);
  const [upDatedQuestions, setUpDatedQuestions] = useState(questions);
  const [isCheck, setIsCheck] = useState(false);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [newGame, setNewGame] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`https://opentdb.com/api.php?amount=5`);
        const data = await res.json();
        if (data) {
          const prepareData = data.results.map(question => ({
            question: decode(question.question),
            correct_answer: decode(question.correct_answer),
            allOptions: [...question.incorrect_answers.map(answer => decode(answer)), decode(question.correct_answer)].sort(() => Math.random() - 0.5),
            isCorrect: false,
            isSelected: false,
            answer: '',
            id: nanoid(8)
          }));
          setQuestions(prepareData);
          setUpDatedQuestions(prepareData);
          setUpDatedQuestions(prepareData => prepareData.map(data => ({
            ...data,
            isSelected: true,
          })))

        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, [newGame]);

  function saveResults(upDatedQuestion) {
   console.log(upDatedQuestion)
    setUpDatedQuestions(prev => prev.map(question => question.id === upDatedQuestion.id
      ? upDatedQuestion : question))
        // console.log(questions)
    console.log(upDatedQuestions)
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsCheck(true);
    setRightAnswer(upDatedQuestions.filter(question => question.isCorrect === true).length);
  }

  function handleReset() {
    setIsCheck(false);
    setRightAnswer(0);
    setQuestions([]);
    setUpDatedQuestions([]);
    setNewGame(!newGame)
  }

  const renderQuestions = arr => arr.map(question =>
    <Question
      key={question.id}
      question={question}
      saveResults={saveResults}
    />)

  const renderAnswers = arr => arr.map(question => {
    return <Question
      key={question.id}
      question={question}
    />
  })

  return (
    <form
      className="App__Quizz Quizz"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {!isCheck && questions
        ? renderQuestions(questions)
        : (isCheck && upDatedQuestions) && renderAnswers(upDatedQuestions)
      }

      {!isCheck && questions.length > 0
        ? (<button
          className='Quizz__btn button button-submit'
          type="submit"
        >
          Check answers
        </button>)

        : (<div className="Quizz__results">
          <p className="Quizz__results-text">You scored {rightAnswer}/5 correct answers</p>
          <button
            className='Questions__btn button button-submit'
            type="reset"
          >
            Play again
          </button>
        </div>)
      }

    </form>
  )
}
