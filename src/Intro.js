import React from 'react'

export const Intro = ({
  setIsStarted,
}) => {

  return (
    <div className="App__Intro Intro">
      <h1 className="Intro__title">Quizzical</h1>
      <h2 className="Intro__desc">Some description if needed</h2>
      <button
        className="button button-start Intro-btn"
        onClick={() => {
          setIsStarted(true);
        }}
      >
        Start quiz
      </button>
    </div>
  )
}
