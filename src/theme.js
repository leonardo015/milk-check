import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `Mina, sans-serif`,
    body: `Lato, sans-serif`,
  },
  brand: {
    900: '#1a365d',
    800: '#00ff00',
    700: '#2a69ac',
  },
});

export default theme;
