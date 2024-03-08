import { useState, useEffect } from 'react';
import './App.css'
import {Button } from '@chakra-ui/react';
import { Text, Box, Flex, Code, Input } from '@chakra-ui/react';
import MatrixBackground from './matrixBackground';
import { Link } from 'react-router-dom';

function IntroPage() {
  

  return (
    <Box>
    <Text>
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'#5ae67f'}}>
    Your mission is to infiltrate the impenetrable fortress of the Seattle Space Needle,
    </pre> 
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'#5ae67f'}}>
    uncovering its secrets hidden in the shadows. 
    </pre>
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'#5ae67f'}}>
    You must employ cunning strategies and cutting-edge technology to breach the defenses,
    </pre>
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'#5ae67f'}}>
    revealing the vulnerabilities lurking beneath the surface. 
    </pre>
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'#5ae67f'}}>
    Your objective: to demonstrate the necessity of vigilance in the ever-evolving world of espionage and cyber warfare, 
    </pre>
    <pre style={{ textAlign: 'center', fontSize: '17px', color:'#5ae67f'}}>
    ensuring that the guardians of tomorrow's security remain one step ahead of the shadows.
    </pre>
    </Text>
    <Link to="/">
    <Button m = "50px" colorScheme= 'green'>
      Begin
    </Button>
    </Link>
    <MatrixBackground />
    </Box>
  );
}

export default IntroPage;