import { useState, useEffect } from 'react';
import './App.css'
import { ChakraProvider, Button } from '@chakra-ui/react';
import { Text, Box, Flex, Code } from '@chakra-ui/react';
import problems from './Problems.json'

function App() {
  const [correctText, setCorrectText] = useState("");
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wpmHighscore, setWpmHighscore] = useState(10);
  // Function to generate a random index within the range of the array length
  const getRandomIndex = () => {
    return Math.floor(Math.random() * problems.problems.length);
  };

  // Function to select a random problem from the JSON data
  const selectRandomProblem = () => {
    const randomIndex = getRandomIndex();
    console.log(problems.problems[randomIndex].solution)
    setCorrectText(problems.problems[randomIndex].solution);
  };

  const [countdown, setCountdown] = useState(0);
  const [clicked, setClicked] = useState(false);
  let onNewLine = true;

  useEffect(() => {
    let intervalId;

    if (clicked && !finished) {
      intervalId = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [clicked, finished]);

  const handleStartClick = () => {
    setFinished(false);
    setCharactersTyped(0);
    selectRandomProblem();
    setInputText("");
    setClicked(true);
    setCountdown(60);
    
  };

  useEffect(() => {
    if (countdown === 0) {
      setClicked(false);
    }
  }, [countdown]);
  const [inputText, setInputText] = useState(''); // Change this to your desired correct text

  const handleInputChange= (event) => {
    if (countdown != 0){
      let correct = false;
      let newChar = event.target.value.slice(-1); // newest character
      const searchSize = 50; // number of spaces ahead to search
      const typedText = inputText;
      if (onNewLine) { // if we are on a new line, perform search
        let testText = typedText + newChar; // first try the character they entered
        for (let i = 1; i <= searchSize; i++) {
          if (correctText.startsWith(testText)) { // check if correct
            correct = true;
            break;
          } else {
            testText = typedText + " ".repeat(i) + newChar; // add variable spaces
          }
        }
        if (correct) {
          if (event.key == 'Enter') {
            onNewLine = true;
          } else {
            onNewLine = false;
          }
          setCharactersTyped(charactersTyped + 1);
          setInputText(testText);
        }
        if(correctText.length === inputText.length){
          console.log("FUCKKKKER");
          setFinished(true);
          if (wpmHighscore < Math.floor(charactersTyped/(60-countdown)/4*60)){
            setWpmHighscore(Math.floor(charactersTyped/(60-countdown)/4*60));
          }
        }
      } else {
        console.log(typedText+newChar)
        if (correctText.startsWith(typedText + newChar)) {
          if (event.key == 'Enter') {
              console.log("KEY IS ENTER");
            onNewLine = true;
          } else {
            console.log("NOT ENTER");
            onNewLine = false;
          }
          setInputText(typedText + newChar);
        }
      }
    }
    
  };
  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault(); // Prevent default behavior of Tab key (e.g., moving focus)
    }
  };

  return (
    <Box>
    <Box>
    <pre style={{ textAlign: 'left' }}>
          {`
                         )                  )                                                                                        
   (                  ( /(      (   (    ( /(                )                      (       )        (   (                           
   )\\      )          )\\()) (   )\\  )\\   )\\())    )       ( /( (          (  (      )\\   ( /(     )  )\\  )\\   (         (  (     (   
 (((_)  ( /(  \`  )   ((_)\  )\\ ((_)((_) ((_)\  ( /(   (   )\\()))\\   (     )\\))(   (((_)  )\\()) ( /( ((_)((_) ))\\  (     )\\))(   ))\\  
 )\\___  )(_)) /(/(    _((_)((_) _   _    _((_) )(_))  )\\ ((_)\((_)  )\\ ) ((_))\\   )\\___ ((_)\  )(_)) _   _  /((_) )\\ ) ((_))\\  /((_) 
((/ __|((_)_ ((_)_\\  | || | (_)| | | |  | || |((_)_  ((_)| |(_)(_) _(_/(  (()(_) ((/ __|| |(_)((_)_ | | | |(_))  _(_/(  (()(_)(_))   
 | (__ / _\` || '_ \\) | __ | | || | | |  | __ |/ _\` |/ _| | / / | || ' \\))/ _\` |   | (__ | ' \\ / _\` || | | |/ -_)| ' \\))/ _\` | / -_)  
  \\___|\\__,_|| .__/  |_||_| |_||_| |_|  |_||_|\\__,_|\\__| |\\_\\_\\ |_||_||_| \\__, |    \\___||_||_|\__,_||_| |_|\\___||_||_| \\__, | \\___|  
             |_|                                                         |___/                                         |___/          
          `}
        </pre>
    </Box>
    <Flex width="100%" m = "5%">
      <Text style={{ textAlign: 'left' }} fontSize="xl">Welcome to The Cap Hill Coding Challenge!</Text>
      
    <Button ml = "30px"
      colorScheme={countdown === 0 ? 'green' : 'red'}
      onClick={handleStartClick}
      disabled={clicked}
      
    >
    
      {countdown === 0 ? 'Start' : `${countdown}`}
    </Button>
    <Button ml = "30px"
      colorScheme={countdown === 0 ? 'blue': 'pink'}
      
    >
      {`WPM: ${Math.floor(charactersTyped/(60-countdown)/4*60)}`}
    </Button>
    </Flex>
      <Box>
      <div className="code-box-wrapper">
      <pre style={{ textAlign: 'left' }}>
      <Code>
        { Array.from(correctText).map((char, index) => (
          <Text
            key={index}
            display="inline"
              color={index < inputText.length && inputText[index] === char ? 'green' : 'white'}
            >
              {char}
            </Text>
          ))}
          </Code>
          </pre>
        </div>
      </Box>
      <Box mt={4} width="100%" height="300px" style={{ backgroundColor: 'black' }}> {/* Adjust width and height as needed */}
        <textarea
        type="text"
        value={inputText.slice(-50)}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        placeholder="Start hacking..."
        style={{ padding: '8px', fontSize: '16px', width: '100%', height: '100%', backgroundColor:'green' }} // Make textarea fill the box
      />
      </Box>
      <Button ml = "30px"
      colorScheme={wpmHighscore < Math.floor(charactersTyped/(60-countdown)/4*60) ? 'blue' : 'yellow'}>
        {"WPM HIGHSCORE: " + wpmHighscore }
      </Button>
    </Box>
  );
}

export default App;
