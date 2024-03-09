import { useState, useEffect, useRef } from 'react';
import './App.css'
import {Button } from '@chakra-ui/react';
import { Text, Box, Flex, Code, Input } from '@chakra-ui/react';
import MatrixBackground from './matrixBackground';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function SuccessPage() {
  
    const text = "Fiirewall Breached.          \n" + Cookies.get('currentscorename') + "         \n" + "WPM: " + Cookies.get('currentscorevalue');

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
        }, 80); // Adjust the interval as needed
    
        return () => clearInterval(interval);
      }, [text]);
  return (
    <Box>
    <Text ml = "400px">
    <pre style={{ textAlign: 'left', fontSize: '40px', color:'#5ae67f'}}>
    {displayText}
    </pre>
    </Text>
    <Link to="/">
    {done ? <Button m = "30px" colorScheme= 'green'>
      Return
    </Button>

     : <Box/>}
     </Link>
    <MatrixBackground color = '#5ae67f' />
    </Box>
  );
}

export default SuccessPage;