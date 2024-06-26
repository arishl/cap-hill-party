import { useState, useEffect } from 'react';
import './App.css'
import {Button } from '@chakra-ui/react';
import { Text, Box, Flex, Code, Input } from '@chakra-ui/react';
import problems from './Problems.json'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';  

function App() {
  let history = useNavigate();
  if (Cookies.get('highscorevalue')==null){
    Cookies.set('highscorevalue', 0, { expires: 7 });
  }
  if (Cookies.get('datagathered')==null){
    console.log("WE HAVE IT")
    Cookies.set('datagathered', '2', { expires: 7 });
  } else {
    console.log("NOT NULL!!")
  }
  if (Cookies.get('highscorename')==null){
    Cookies.set('highscorename', "unclaimed", { expires: 7 })
  }
  const [correctText, setCorrectText] = useState("");
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wpmHighscore, setWpmHighscore] = useState(Cookies.get('highscorevalue'));
  const [currentName, setCurrentName] = useState("");
  const [highscoreName, setHighscoreName] = useState(Cookies.get('highscorename'));
  let dataGathered = parseInt(Cookies.get('datagathered'));
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
  useEffect(()=>{
    if(clicked && countdown === 0 && !finished){
      history('/failure');
    }
  })
  

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
  const [inputText, setInputText] = useState('');

  const handleCurrentNameChange = (event) => {
    setCurrentName(event.target.value); // Update the input value state
  }; // Change this to your desired correct text

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
          console.log('Characters typed:' + charactersTyped)
          setCharactersTyped(charactersTyped + 1);
          setInputText(testText);
        }
        if(correctText.length === inputText.length){ // do finishing logic
          console.log("FUCKKKKER");
          
          
          if(!finished){
            const holder = charactersTyped + dataGathered;
            Cookies.set('datagathered', holder,{expires: 7});
          }
          setFinished(true);
          
          if (wpmHighscore < Math.floor(charactersTyped/(60-countdown)/4*60)){
            setWpmHighscore(Math.floor(charactersTyped/(60-countdown)/4*60));
            setHighscoreName(currentName);
            Cookies.set('highscorename', currentName, { expires: 7 });
            Cookies.set('highscorevalue', Math.floor(charactersTyped/(60-countdown)/4*60), { expires: 7 });
            history('/optimized');
          } else {
            Cookies.set('currentscorevalue', Math.floor(charactersTyped/(60-countdown)/4*60), { expires: 7 })
            Cookies.set('currentscorename', currentName, { expires: 7 })
            history('/success');
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
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      mt="-15%"
    >
      <Box>
        <Box>
          <pre style={{ textAlign: 'center', fontSize: '15px', color: '#5ae67f' }}>
            {`
  )                       )
  (                      ( /(        (    (      ( /(                   )                            (        )          (    (                                 
  )\\       )             )\\())  (    )\\   )\\     )\\())     )         ( /(   (            (  (        )\\    ( /(      )   )\\   )\\     (            (  (      (   
  (((_)   ( /(   \`  )     ((_)\\   )\\  ((_) ((_)   ((_)\\   ( /(    (    )\\())  )\\    (      )\\))(     (((_)   )\\())  ( /(  ((_) ((_)   ))\\    (      )\\))(    ))\\  
  )\\___   )(_))  /(/(      _((_) ((_)  _    _      _((_)  )(_))   )\\  ((_)\\  ((_)   )\\ )  ((_))\\     )\\___  ((_)\\   )(_))  _    _    /((_)   )\\ )  ((_))\\   /((_) 
  ((/ __| ((_)_  ((_)_\\    | || |  (_) | |  | |    | || | ((_)_   ((_) | |(_)  (_)  _(_/(   (()(_)   ((/ __| | |(_) ((_)_  | |  | |  (_))    _(_/(   (()(_) (_))   
   | (__  / _\` | | '_ \\)   | __ |  | | | |  | |    | __ | / _\` | / _|  | / /   | | | ' \\)) / _\` |     | (__  | ' \\  / _\` | | |  | |  / -_)  | ' \\)) / _\` |  / -_)  
    \\___| \\__,_| | .__/    |_||_|  |_| |_|  |_|    |_||_| \\__,_| \\__|  |_\\_\\   |_| |_||_|  \\__, |      \\___| |_||_| \\__,_| |_|  |_|  \\___|  |_||_|  \\__, |  \\___|  
                 |_|                                                                       |___/                                                    |___/          
  
  `}
          </pre>
        </Box>
        <Flex
          width="100%"
          mb="1%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Flex>
          <Input
            placeholder="Enter credentials"
            variant="outline"
            size="md"
            width="20%"
            mr="4%"
            value={currentName} // Bind the value to the state
            onChange={handleCurrentNameChange}
          />
          <Button 
            colorScheme={finished ? 'green' : !finished && countdown > 0 ? `red` : inputText.length>0 ? 'red' : 'green'}
            onClick={handleStartClick}
            disabled={clicked}
          >
            {finished ? 'Firewall Breached!' : !finished && countdown > 0 ? `${countdown}` : inputText.length>0 ? 'Failure' : 'Start'}
          </Button>
          <Button ml="30px" colorScheme={countdown === 0 ? 'blue': 'pink'}>
            {`WPM: ${Math.floor(charactersTyped/(60-countdown)/4*60)}`}
          </Button>
          <Button ml="30px" colorScheme={wpmHighscore < Math.floor(charactersTyped/(60-countdown)/4*60) ? 'blue' : 'yellow'}>
            {wpmHighscore < Math.floor(charactersTyped/(60-countdown)/4*60) ? "WPM HIGHSCORE: " + Math.floor(charactersTyped/(60-countdown)/4*60) + " - " + currentName + "???" : "WPM HIGHSCORE: " + wpmHighscore + " - " + highscoreName}
          </Button>
          <Button ml="30px" colorScheme='orange'>
            { "Data retrieved: " + Cookies.get('datagathered')}
          </Button>
          </Flex>
        </Flex>
        <Box>
          <div className="code-box-wrapper" style={{ display: 'flex', justifyContent: 'center', height: '100%', padding: '2%', }}>
            <pre style={{ textAlign: 'left' }}>
              <Code style={{ backgroundColor: '#164723' }}>
                { Array.from(correctText).map((char, index) => (
                  <Text
                    key={index}
                    display="inline"
                    color={index < inputText.length && inputText[index] === char ? '#16fa53' : 'white'}
                    style={{ fontSize: '18px'}}
                  >
                    {char}
                  </Text>
                ))}
              </Code>
            </pre>
          </div>
        </Box>
        <Box mt={4} width="100%" height="100px" style={{ backgroundColor: 'black' }}>
          <textarea
            height="100%"
            type="text"
            value={inputText.slice(-50)}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            placeholder={"Start hacking " + currentName + "..."}
            style={{ padding: '8px', fontSize: '16px', width: '100%', height: '100%', backgroundColor:'black', color: '#59ff85' }}
          />
        </Box>
      </Box>
    </Flex>
  );
  
}

export default App;
