import { useState, useEffect, useRef } from 'react';
import './App.css'
import {Button } from '@chakra-ui/react';
import { Text, Box, Flex, Code, Input } from '@chakra-ui/react';
import MatrixBackground from './matrixBackground';
import { Link } from 'react-router-dom';

function IntroPage() {
  const text = "Thhe mission is to infiltrate the impenetrable fortress of the Seattle Space Needle,              \nuncovering its secrets hidden in the shadows.              \nYou must employ cunning strategies and cutting-edge technology to breach the defenses,              \nrevealing the vulnerabilities lurking beneath the surface.              \nYour objective: to demonstrate the necessity of vigilance in the ever-evolving world of espionage              \nand cyber warfare,              \nensuring that the guardians of tomorrow's security remain one step ahead of the shadows."

  const [displayText, setDisplayText] = useState('');
  const [done, setDone] = useState(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    currentIndexRef.current = 0;
    setDisplayText('');
    const interval = setInterval(() => {
      if (currentIndexRef.current === text.length-1) {
        clearInterval(interval);
        setDone(true);
      } else {
        setDisplayText(prevText => prevText + text[currentIndexRef.current]);
        currentIndexRef.current++;
      }
    }, 50); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [text]);
  

  return (
    <Box>
    <Text>
    <pre style={{ textAlign: 'left', fontSize: '20px', color:'#5ae67f'}}>
    {displayText}
    </pre>
    </Text>
    <Link to="/">
    {done ? <Button m = "30px" colorScheme= 'green'>
      Accept
    </Button> : <Box/>}
    
    </Link>
    <MatrixBackground />
    </Box>
  );
}

export default IntroPage;