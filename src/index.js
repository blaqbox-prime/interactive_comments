import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import CommentsProvider from './useComments'

// const theme = extendTheme({colors, styles:{global:globalStyles}})

const theme = extendTheme({
  colors: {
    moderate_blue: 'hsl(238, 40%, 52%)',
  soft_red: 'hsl(358, 79%, 66%)',
  light_grayish_blue: 'hsl(239, 57%, 85%)',
  pale_red: 'hsl(357, 100%, 86%)',
  dark_blue: 'hsl(212, 24%, 26%)',
  grayish_blue: 'hsl(211, 10%, 45%)',
  light_gray: 'hsl(223, 19%, 93%)',
  very_light_gray: 'hsl(228, 33%, 97%)',
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'light_gray',
        color: 'black',
      },
      // styles for the `a`
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
})

ReactDOM.render(
    <CommentsProvider>
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
    </CommentsProvider>,
  document.getElementById('root')
);
