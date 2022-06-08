import { ChakraProvider, Container } from '@chakra-ui/react';
import theme from '../theme';
import '@fontsource/lato';
import '@fontsource/mina';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Container maxW="container.lg">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
