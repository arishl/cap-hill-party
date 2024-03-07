import { useState, useEffect } from 'react';
import './App.css'
import { Button } from '@chakra-ui/react';
import { Text, Box, Flex, Code } from '@chakra-ui/react';
import problems from './Problems.json'

function App() {
  const [randomProblem, setRandomProblem] = useState('');
  const [correctText, setCorrectText] = useState("");
  // Function to generate a random index within the range of the array length
  const getRandomIndex = () => {
    return Math.floor(Math.random() * problems.problems.length);
  };

  // Function to select a random problem from the JSON data
  const selectRandomProblem = () => {
    const randomIndex = getRandomIndex();
    console.log(problems.problems[randomIndex].solution)
    setRandomProblem(problems.problems[randomIndex].solution);
  };

  const [countdown, setCountdown] = useState(0);
  const [clicked, setClicked] = useState(false);
  let onNewLine = true;

  useEffect(() => {
    let intervalId;

    if (clicked) {
      intervalId = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [clicked]);

  const handleStartClick = () => {
    
    selectRandomProblem();
    setInputText("");
    setClicked(true);
    setCountdown(60);
    setCorrectText(randomProblem);
    setCorrectText(randomProblem);
    
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
          setInputText(testText);
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
    
    <Box width="100%">
    <Flex width="100%" m = "5%">
      <Text style={{ textAlign: 'left' }} fontSize="xl">Welcome to the Cap Hill coding Challenge!</Text>
      
    <Button ml = "30px"
      colorScheme={countdown === 0 ? 'green' : 'red'}
      onClick={handleStartClick}
      disabled={clicked}
      
    >
      {countdown === 0 ? 'Start' : `${countdown}`}
    </Button>
    </Flex>
      <Box>
      <pre style={{ textAlign: 'left' }}>
      <Code>
        { Array.from(correctText).map((char, index) => (
          <Text
            key={index}
            display="inline"
            color={index < inputText.length && inputText[index] === char ? 'green' : 'inherit'}
          >
            {char}
          </Text>
        ))}
        </Code>
        </pre>
      </Box>
      <Box mt={4} width="100%" height="300px"> {/* Adjust width and height as needed */}
        <textarea
        type="text"
        value={inputText.slice(-50)}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        placeholder="Start typing..."
        style={{ padding: '8px', fontSize: '16px', width: '100%', height: '100%' }} // Make textarea fill the box
      />
      </Box>
    </Box>
    </Box>
  );
}

export default App;
