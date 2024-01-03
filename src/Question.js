import React from 'react';
import cn from 'classnames';

export const Question = ({ question, saveResults }) => {
  let upDatedQuestion = {};

  const handleChange = (e) => {
    let value = e.target.value;

    upDatedQuestion = {
      ...question,
      answer: value,
      isSelected: true,
    };

    upDatedQuestion.isCorrect = upDatedQuestion.answer === upDatedQuestion.correct_answer;
    saveResults(upDatedQuestion);
  }

  return (
    <fieldset className="Question" id={question.id}>
      <legend className="Question__title"><h3>{question.question}</h3></legend>
      <div className="Question__options">
        {question.allOptions.map((option, index) => {
          let isCorrectAnswer = question.correct_answer === option;
          return <input
            key={index}
            className={cn("Question__input", {
              "correct": isCorrectAnswer && question.isSelected,
              "incorrect": !isCorrectAnswer && question.answer === option,
              "disabled" : question.isSelected
            })}
            type="radio"
            required
            name={question.question}
            label={option}
            value={option}
            id={option}
            onChange={(e) => handleChange(e)}
          />
        })}
      </div>
    </fieldset>
  )
}
