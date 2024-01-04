import React, { memo } from 'react'

export const Intro = memo(({
  setIsStarted,
  gameOptions,
  setGameOptions
}) => {

  const handleChange = e => {
    const { name, value } = e.target;

    setGameOptions(prevGameOptions => ({
        ...prevGameOptions,
        [name]: value
      }
    ));
  }

  const handleSubmit = e => {
    e.preventDefault();
    setIsStarted(true);
  }

  return (
    <div className="App__Intro Intro">
      <h1 className="Intro__title">Quizzical</h1>
      <h2 className="Intro__desc">
        Pick your categories and get quizzed about them!</h2>
      <form
        className='Intro__form'
        onSubmit={handleSubmit}
      >
        <label htmlFor="amount"><h3>Number of Questions:</h3></label>
        <input
          type="number"
          name="amount"
          id="amount"
          className="Intro__form-control"
          min="1"
          max="50"
          value={gameOptions.amount}
          onChange={handleChange}
        />

        <label htmlFor="category"><h3>Select Category:</h3> </label>
        <select
          name="category"
          id="category"
          className="Intro__form-control"
          value={gameOptions.category}
          onChange={handleChange}
        >
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>

        <label htmlFor="difficulty"><h3>Select Difficulty: </h3></label>
        <select
          name="difficulty"
          id="difficulty"
          className="Intro__form-control"
          value={gameOptions.difficulty}
          onChange={handleChange}
        >
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label htmlFor="type"><h3>Select Type: </h3></label>
        <select
          name="type"
          id="type"
          className="Intro__form-control"
          value={gameOptions.type}
          onChange={handleChange}
        >
          <option value="">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>


        <button
          className="button button-start Intro__btn"
          type='submit'
        >
          Start quiz
        </button>
      </form>
    </div>
  )
}
)