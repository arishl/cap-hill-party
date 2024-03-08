
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import IntroPage from './IntroPage'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
    <Route path="/intro" element={<ChakraProvider theme={theme}><IntroPage/></ChakraProvider>}/>
    <Route exact path="/" element={<ChakraProvider theme={theme}><App /></ChakraProvider>} />
    </Routes>
  </Router>
  
)
