import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { ColorModeScript, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from './lib/AuthContext.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SocketContextProvider } from './lib/SocketContext.jsx';
const queryClient = new QueryClient();

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('ray.100', '#101010')(props),
    },
  }),
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: '#616161',
    dark: '#1e1e1e',
  },
  blue: {
    light: '',
  },
};

export const theme = extendTheme({ config, styles, colors });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialCOlorMode} />
          <AuthProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
