import NextLink from 'next/link';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Icon,
} from '@chakra-ui/react';
import { TbError404 } from 'react-icons/tb';
import { BiArrowBack } from 'react-icons/bi';

const Custom404 = () => {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      // height="200px"
      my="4"
    >
      <Icon as={TbError404} boxSize="40px" mt={4} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Página não encontrada
      </AlertTitle>
      <AlertDescription maxWidth="sm" mb={4}>
        O endereço ou recurso solicitado não foi encontrado
        <NextLink href="/">
          <Button leftIcon={<BiArrowBack />} variant="outline" my="6">
            Voltar à página inicial
          </Button>
        </NextLink>
      </AlertDescription>
    </Alert>
  );
};

export default Custom404;
