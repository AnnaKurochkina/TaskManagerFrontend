import React, { useState, useEffect } from "react";

import logo from './logo.svg';
import './App.scss';

import { VStack, IconButton, Box, Heading, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from "react-icons/fa";


function App() {

  const [message, setMessage] = useState("");

  const getMessage = async () => {
    const url = `http://localhost:8080/`;
    const res = await fetch(url);
    const text = await res.text();
    setMessage(text);
  };

  useEffect(() => {
    getMessage();
  }, []);

  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <div className="App">
    <VStack p='4'>
      <IconButton icon={colorMode === 'light' ? <FaSun /> : <FaMoon />} isRound='true' size='lg' alignSelf='flex-end' onClick={toggleColorMode} />
      <Box>
        <Heading className="header" >Task Manager</Heading>
        {/* <Heading className="header" mb='8' fontWeight='extrabold' size='2xl' bgGradient='linear(to-r, cyan.400, purple.400, pink.400)' bgClip='text'>Todo Application</Heading> */}
      </Box>
      <p>{message}</p>
    </VStack>
    </div>
    
  );
}

export default App;
