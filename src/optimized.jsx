import { useState, useEffect } from 'react';
import './App.css'
import {Button } from '@chakra-ui/react';
import { Text, Box, Flex, Code, Input } from '@chakra-ui/react';
import MatrixBackground from './matrixBackground';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function OptimizedPage() {
  

  return (
    <Box>
    <Text>
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'yellow'}}>
    Code Optimized.
    </pre>
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'yellow'}}>
    {Cookies.get('highscorename')}
    </pre>
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'yellow'}}>
    {'WPM: ' + Cookies.get('highscorevalue')}
    </pre>
    </Text>
    <Link to="/">
    <Button m = "50px" colorScheme= 'yellow'>
      Return
    </Button>
    </Link>
    <MatrixBackground color = 'yellow' />
    </Box>
  );
}

export default OptimizedPage;