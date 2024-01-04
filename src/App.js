import { useState } from 'react';

import { Intro } from './Intro';
import { Quizz } from './Quizz';


export const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [gameOptions, setGameOptions] = useState({
      amount: 5,
			category: "",
			difficulty: "",
			type: ""
		});

  return (
    <div className="App">
      {isStarted ?
        <Quizz gameOptions={gameOptions}/> :
        <Intro
          setIsStarted={setIsStarted}
          gameOptions={gameOptions}
          setGameOptions={setGameOptions}
        />
      }
    </div>
  );
}


