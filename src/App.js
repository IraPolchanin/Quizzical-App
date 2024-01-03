import { useState } from 'react';

import { Intro } from './Intro';
import { Quizz } from './Quizz';


export const App = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="App">
      {isStarted ?
        <Quizz /> :
        <Intro
          setIsStarted={setIsStarted}
        />
      }
    </div>
  );
}


