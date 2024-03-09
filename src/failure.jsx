import { useState, useEffect } from 'react';
import './App.css'
import {Button } from '@chakra-ui/react';
import { Text, Box, Flex, Code, Input } from '@chakra-ui/react';
import MatrixBackground from './matrixBackground';
import { Link } from 'react-router-dom';

function FailurePage() {
  

  return (
    <Box>
    <Text>
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'red'}}>
    Failure to infiltrate.
    </pre>
    </Text>
    <Link to="/">
    <Button m = "50px" colorScheme= 'red'>
      Return
    </Button>
    </Link>
    <MatrixBackground color = 'red' />
    </Box>
  );
}

export default FailurePage;