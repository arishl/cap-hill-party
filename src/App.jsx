import { useState, useEffect } from 'react';
import './App.css'
import { Button } from '@chakra-ui/react';
import { Text, Box, Flex, Code } from '@chakra-ui/react';

function App() {
  const [countdown, setCountdown] = useState(0);
  const [clicked, setClicked] = useState(false);

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
    setClicked(true);
    setCountdown(60);
  };

  useEffect(() => {
    if (countdown === 0) {
      setClicked(false);
    }
  }, [countdown]);
  const [inputText, setInputText] = useState('');
  const correctText =
`def factorial(n):
  if n == 0:
    return 1
  else:
    return n * factorial(n-1)
num = 5
print("Factorial of", num, "is", factorial(num))
`; // Change this to your desired correct text

  const handleInputChange= (event) => {
    if (countdown != 0){
      const typedText = inputText + event.target.value.slice(-1); // Get the last 5 characters

    // Check if the typed text matches the correct text
      if (correctText.startsWith(typedText)) {
        setInputText(typedText);
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
        {Array.from(correctText).map((char, index) => (
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
