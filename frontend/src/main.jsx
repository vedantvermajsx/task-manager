import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from "./contexts/AuthContext.jsx";

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#8b5cf6',
      500: '#7c3aed',
      600: '#6d28d9',
      700: '#5b21b6',
      800: '#4c1d95',
      900: '#2e1065',
    },
    accent: {
      500: '#ec4899',
    }
  },
  fonts: {
    heading: `'Plus Jakarta Sans', sans-serif`,
    body: `'Plus Jakarta Sans', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#050510',
        color: 'white',
      }
    }
  }
})

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Toaster />
      <App />
    </AuthProvider>
  </ChakraProvider>
)
