
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, Box } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
  <Box bg="gray" minHeight="100vh">
    <App />
  </Box>
  </ChakraProvider>,
)
