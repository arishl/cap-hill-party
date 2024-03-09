import { useState, useEffect } from 'react';
import './App.css'
import {Button } from '@chakra-ui/react';
import { Text, Box, Flex, Code, Input } from '@chakra-ui/react';
import MatrixBackground from './matrixBackground';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function SuccessPage() {
  

  return (
    <Box>
    <Text>
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'green'}}>
    Firewall breached.
    </pre>
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'green'}}>
    {Cookies.get('currentscorename')}
    </pre>
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'green'}}>
    {'WPM: ' + Cookies.get('currentscorevalue')}
    </pre>
    </Text>
    <Link to="/">
    <Button m = "50px" colorScheme= 'green'>
      Return
    </Button>
    </Link>
    <MatrixBackground color = 'green' />
    </Box>
  );
}

export default SuccessPage;