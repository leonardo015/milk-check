import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Spacer,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { BiArrowBack } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';

const MapWithNoSSR = dynamic(() => import('../../../components/Map'), {
  ssr: false,
});

const ChecklistDetail = ({ supervision }) => {
  const router = useRouter();

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    text: '',
    actionName: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const toast = useToast();

  const handleDelete = (id) => {
    setConfirmDialog({
      open: true,
      title: `Excluir supervisão ${id}`,
      text: `Tem certeza que deseja excluir esta supervisão? Essa ação não poderá ser desfeita.`,
      actionName: 'Excluir',
      onConfirm: () => {
        axios.delete(`/api/checklist/${id}`).then(function (response) {
          setConfirmDialog(false);
          toast({
            title: 'Supervisão excluída',
            status: 'success',
            duration: 5000,
            isClosable: true,
            onCloseComplete: () => router.replace('/'),
          });
        });
      },
      onCancel: () => {
        setConfirmDialog(false);
      },
    });
  };

  return (
    <>
      <Head>
        <title>Milk Check - Supervisão {supervision.id}</title>
      </Head>
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        text={confirmDialog.text}
        actionName={confirmDialog.actionName}
        onConfirm={confirmDialog.onConfirm}
        onCancel={confirmDialog.onCancel}
      />
      <HStack>
        <NextLink href="/">
          <Button leftIcon={<BiArrowBack />} variant="outline" my="6">
            Supervisões
          </Button>
        </NextLink>
        <Spacer />
        <NextLink href={`/checklist/${supervision.id}/edit`}>
          <Button colorScheme="green" variant="solid" my="6">
            Editar
          </Button>
        </NextLink>
        <Button
          variant="outline"
          colorScheme="red"
          my="6"
          onClick={() => handleDelete(supervision.id)}
        >
          Excluir
        </Button>
      </HStack>
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Wrap justify="center">
          <WrapItem w="full">
            <Box textAlign="center" w="full">
              <Heading
                bg={useColorModeValue('gray.200', 'gray.700')}
                borderRadius="sm"
                p={2}
              >
                {supervision.farmer.name}
                <Text
                  fontSize="sm"
                  color={useColorModeValue('gray.900', 'gray.200')}
                >
                  <Icon as={GrLocation} /> {supervision.farmer.city}
                </Text>
              </Heading>
            </Box>
          </WrapItem>
          <WrapItem>
            <Box
              bg={useColorModeValue('gray.200', 'gray.700')}
              borderRadius="md"
              textAlign="center"
              m="1"
            >
              <Text
                w="full"
                px={2}
                borderTopRadius="md"
                bg={useColorModeValue('gray.300', 'gray.500')}
                variant="solid"
                colorScheme="blackAlpha"
              >
                Fazendeiro
              </Text>
              <Text fontSize="xl" px={4}>
                {supervision.from.name}
              </Text>
            </Box>
          </WrapItem>
          <WrapItem>
            <Box
              bg={useColorModeValue('gray.200', 'gray.700')}
              borderRadius="md"
              textAlign="center"
              m="1"
            >
              <Text
                w="full"
                px={2}
                borderTopRadius="md"
                bg={useColorModeValue('gray.300', 'gray.500')}
                variant="solid"
                colorScheme="blackAlpha"
              >
                Supervisor
              </Text>
              <Text fontSize="xl" px={4}>
                {supervision.to.name}
              </Text>
            </Box>
          </WrapItem>
          <WrapItem>
            <Box
              bg={useColorModeValue('gray.200', 'gray.700')}
              borderRadius="md"
              textAlign="center"
              m="1"
            >
              <Text
                w="full"
                px={2}
                borderTopRadius="md"
                bg={useColorModeValue('gray.300', 'gray.500')}
                variant="solid"
                colorScheme="blackAlpha"
              >
                Tipo
              </Text>
              <Text fontSize="xl" px={4}>
                {supervision.type}
              </Text>
            </Box>
          </WrapItem>
          <WrapItem>
            <Box
              bg={useColorModeValue('gray.200', 'gray.700')}
              borderRadius="md"
              textAlign="center"
              m="1"
            >
              <Text
                w="full"
                px={2}
                borderTopRadius="md"
                bg={useColorModeValue('gray.300', 'gray.500')}
                variant="solid"
                colorScheme="blackAlpha"
              >
                Produção de leite
              </Text>
              <Text fontSize="xl" px={4}>
                {supervision.amount_of_milk_produced}
              </Text>
            </Box>
          </WrapItem>
          <WrapItem>
            <Box
              bg={useColorModeValue('gray.200', 'gray.700')}
              borderRadius="md"
              textAlign="center"
              m="1"
            >
              <Text
                w="full"
                px={2}
                borderTopRadius="md"
                bg={useColorModeValue('gray.300', 'gray.500')}
                variant="solid"
                colorScheme="blackAlpha"
              >
                Cabeças de gado
              </Text>
              <Text fontSize="xl" px={4}>
                {supervision.number_of_cows_head}
              </Text>
            </Box>
          </WrapItem>
          <WrapItem>
            <Box
              bg={useColorModeValue('gray.200', 'gray.700')}
              borderRadius="md"
              textAlign="center"
              m="1"
            >
              <Text
                w="full"
                px={2}
                borderTopRadius="md"
                bg={useColorModeValue('gray.300', 'gray.500')}
                variant="solid"
                colorScheme="blackAlpha"
              >
                Supervisão mensal
              </Text>
              <Text fontSize="xl" px={4}>
                {supervision.had_supervision ? 'Realizada' : 'Não realizada'}
              </Text>
            </Box>
          </WrapItem>
        </Wrap>
        <Box bg="teal" w="full" h="320px">
          <MapWithNoSSR
            marker={{
              lat: supervision.location.latitude,
              lng: supervision.location.longitude,
            }}
            farmName={supervision.farmer.name}
          />
        </Box>
      </Stack>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(
    `http://challenge-front-end.bovcontrol.com/v1/checkList/${id}`
  );
  const supervision = await res.json();

  if (supervision.message === 'CheckList not found') {
    return {
      redirect: {
        destination: '/404',
      },
    };
  }
  return { props: { supervision } };
}

export default ChecklistDetail;
