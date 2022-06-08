import { useState } from 'react';
import axios from 'axios';
import NextLink from 'next/link';
import Head from 'next/head';
import moment from 'moment';
import {
  Box,
  Button,
  Icon,
  Heading,
  HStack,
  Spacer,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
  Tooltip,
  IconButton,
  useToast,
  Link,
  Stack,
} from '@chakra-ui/react';
import { GoLocation } from 'react-icons/go';
import { CgDetailsMore } from 'react-icons/cg';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FiClock } from 'react-icons/fi';
import ConfirmDialog from '../components/ConfirmDialog';

moment.locale('pt-br');

const Index = ({ supervisions }) => {
  const toast = useToast();
  const [data, setData] = useState(supervisions);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    text: '',
    actionName: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

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
          });
          setData(data.filter((s) => s._id !== id));
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
        <title>Milk Check - Supervisões</title>
      </Head>
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        text={confirmDialog.text}
        actionName={confirmDialog.actionName}
        onConfirm={confirmDialog.onConfirm}
        onCancel={confirmDialog.onCancel}
      />
      <HStack my="4">
        <Heading size="lg">Supervisões</Heading>
        <Spacer />
        <NextLink href="/checklist/novo">
          <Button colorScheme="linkedin" variant="solid">
            {useBreakpointValue({ base: 'Nova', md: 'Nova supervisão' })}
          </Button>
        </NextLink>
      </HStack>
      <VStack>
        {data.map((supervision) => (
          <Box
            bg={useColorModeValue('gray.200', 'gray.700')}
            w="full"
            p={4}
            borderRadius="md"
            key={supervision._id}
          >
            <HStack>
              <Stack direction={{ base: 'column', md: 'row' }}>
                <VStack align="left">
                  <Heading mr="4" fontSize="lg">
                    {supervision.farmer.name}
                  </Heading>
                  <Text
                    fontSize="sm"
                    color={useColorModeValue('gray.600', 'gray.400')}
                  >
                    <Icon
                      as={GoLocation}
                      color={useColorModeValue('gray.600', 'gray.400')}
                      mr="2"
                    />
                    {supervision.farmer.city}
                  </Text>
                </VStack>
                <Spacer maxW="4" />
                <VStack align="left" justify="center">
                  <Text as="sub" color="gray.500">
                    Fazendeiro
                  </Text>
                  <Text mt="0">{supervision.from.name}</Text>
                </VStack>
                <Spacer maxW="4" />
                <VStack align="left" justify="center">
                  <Text as="sub" color="gray.500">
                    Supervisor
                  </Text>
                  <Text mt="0">{supervision.to.name}</Text>
                </VStack>
              </Stack>
              <Spacer />
              <Stack
                direction={{ base: 'column', md: 'row' }}
                alignItems="center"
                justify="center"
              >
                <Tooltip
                  label={`Criado em ${moment(supervision.created_at).format(
                    'DD/MM/YYYY [às] HH:MM'
                  )}`}
                >
                  <span style={{ maxHeight: '20px' }}>
                    <Icon color="gray.400" as={FiClock} />
                  </span>
                </Tooltip>
                <Spacer maxW="8px" />
                <IconButton
                  size="md"
                  icon={<MdDelete size="18px" />}
                  variant="ghost"
                  onClick={() => handleDelete(supervision._id)}
                />
                <NextLink href={`/checklist/${supervision._id}/edit`}>
                  <IconButton
                    size="md"
                    icon={<MdEdit size="18px" />}
                    variant="ghost"
                  />
                </NextLink>
                <NextLink href={`/checklist/${supervision._id}`}>
                  <IconButton
                    colorScheme="linkedin"
                    size="md"
                    icon={<CgDetailsMore size="24px" />}
                    variant="solid"
                  />
                </NextLink>
              </Stack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(
    'http://challenge-front-end.bovcontrol.com/v1/checkList'
  );
  const supervisions = await res.json();

  return { props: { supervisions } };
}

export default Index;
