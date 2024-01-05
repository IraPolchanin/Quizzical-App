import React, { memo, useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import { Question } from './Question'

export const Quizz = memo(({ gameOptions }) => {
  const [questions, setQuestions] = useState([]);
  const [upDatedQuestions, setUpDatedQuestions] = useState(questions);
  const [isCheck, setIsCheck] = useState(false);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [newGame, setNewGame] = useState(false);

  let url = `https://opentdb.com/api.php?amount=${gameOptions.amount}&category=${gameOptions.category}&difficulty=${gameOptions.difficulty}&type=${gameOptions.type}`;
 
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(url);
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
  }, [newGame, url]);

  const saveResults = upDatedQuestion => setUpDatedQuestions(prev => prev.map(question => question.id === upDatedQuestion.id
    ? upDatedQuestion : question));

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    setIsCheck(true);
    setRightAnswer(upDatedQuestions.filter(question => question.isCorrect === true).length);
  }, [upDatedQuestions]);

  const handleReset = useCallback(() => {
    setIsCheck(false);
    setRightAnswer(0);
    setQuestions([]);
    setUpDatedQuestions([]);
    setNewGame(!newGame)
  }, [newGame]);

  const renderQuestions = useCallback(arr => arr.map(question =>
    <Question
      key={question.id}
      question={question}
      saveResults={saveResults}
    />
  ), []);

  const renderAnswers = useCallback(arr => arr.map(question => {
    return <Question
      key={question.id}
      question={question}
    />
  }), []);

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

        : isCheck && questions.length > 0 && (<div className="Quizz__results">
          <p className="Quizz__results-text">You scored {rightAnswer}/ {gameOptions.amount} correct answers</p>
          <button
            className='Questions__btn button button-submit'
            type="reset"
          >
            Play again
          </button>

          <button
            className='Questions__btn button button-reset'
            type="button"
            onClick={() => document.location.reload()}
          >
            Change Quizz settings
          </button>
        </div>)
      }

    </form>
  )
})
