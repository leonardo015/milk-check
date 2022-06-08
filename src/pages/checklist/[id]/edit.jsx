import axios from 'axios';
import Head from 'next/head';
import NextLink from 'next/link';
import { useState, useReducer, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';
const MapWithNoSSR = dynamic(() => import('../../../components/Map'), {
  ssr: false,
});

const EditSupervision = ({ data }) => {
  const initialState = {
    farm_name: data.farmer.name,
    farm_city: data.farmer.city,
    farmer_name: data.from.name,
    supervisor_name: data.to.name,
    type: data.type,
    milk_amount: Number(data.amount_of_milk_produced),
    cow_heads: Number(data.number_of_cows_head),
    supervised: data.had_supervision,
    latitude: data.location.latitude,
    longitude: data.location.longitude,
  };
  let initialValidationState = Object.assign({}, initialState);
  Object.keys(initialValidationState).map((key) => {
    initialValidationState[key] = null;
  });

  const router = useRouter();
  const toast = useToast();

  const handleChangeReducer = (supervision, input) => {
    let newState = Object.assign({}, supervision);
    newState[input.name] = input.value;
    return newState;
  };
  const [supervision, handleChange] = useReducer(
    handleChangeReducer,
    initialState
  );

  const [validation, handleValidation] = useReducer((validation, action) => {
    let newState = Object.assign({}, validation);
    switch (action.type) {
      case 'reset':
        return initialValidationState;

      case 'invalidate':
        newState[action.inputName] = false;
        return newState;

      case 'validate':
        newState[action.inputName] = true;
        return newState;
    }
  }, initialValidationState);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data) => {
    handleValidation({ type: 'reset' });
    Object.keys(supervision).map((key) => {
      switch (key) {
        case 'farm_name':
        case 'farm_city':
        case 'farmer_name':
        case 'supervisor_name':
        case 'type':
        case 'milk_amount':
        case 'cow_heads':
          if (!supervision[key]) {
            handleValidation({ type: 'invalidate', inputName: key });
          } else {
            handleValidation({ type: 'validate', inputName: key });
          }
        case 'latitude':
        case 'longitude':
          if (!supervision[key] || supervision[key] === 0) {
            handleValidation({ type: 'invalidate', inputName: key });
          } else {
            handleValidation({ type: 'validate', inputName: key });
          }
      }
    });
  };

  useEffect(() => {
    if (
      validation.farm_name &&
      validation.farm_city &&
      validation.farmer_name &&
      validation.supervisor_name &&
      validation.milk_amount &&
      validation.cow_heads &&
      validation.latitude &&
      validation.longitude
    ) {
      onSubmit();
    }
  }, [validation]);

  const onSubmit = () => {
    setIsSubmitting(true);
    const now = new Date();
    const updated_at = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString();
    const postChecklistData = {
      id: data.id,
      type: supervision.type,
      amount_of_milk_produced: Number(supervision.milk_amount),
      number_of_cows_head: Number(supervision.cow_heads),
      had_supervision: supervision.supervised,
      farmer: {
        name: supervision.farm_name,
        city: supervision.farm_city,
      },
      to: {
        name: supervision.supervisor_name,
      },
      from: {
        name: supervision.farmer_name,
      },
      location: {
        latitude: Number(supervision.latitude),
        longitude: Number(supervision.longitude),
      },
      created_at: data.created_at,
      updated_at: updated_at,
    };
    axios
      .put('/api/checklist', postChecklistData)
      .then(function (response) {
        setIsSubmitting(false);
        toast({
          title: 'Supervisão atualizada',
          status: 'success',
          duration: 3000,
          isClosable: true,
          onCloseComplete: () => router.push(`/checklist/${response.data.id}`),
        });
      })
      .catch(function (error) {
        setIsSubmitting(false);
        console.log('error:', error.response?.data);
      });
  };

  return (
    <>
      <Head>
        <title>Milk Check - Editar supervisão {data.id}</title>
      </Head>

      <HStack>
        <NextLink href={`/checklist/${data.id}`}>
          <Button leftIcon={<BiArrowBack />} variant="outline" my="6">
            Supervisão {data.id}
          </Button>
        </NextLink>

        <Spacer />

        <Button
          display={{ base: 'none', md: 'flex' }}
          onClick={handleSubmit}
          isLoading={isSubmitting}
          loadingText="Salvando"
          colorScheme="linkedin"
          my="4"
        >
          Salvar alterações
        </Button>
      </HStack>

      <Stack
        bg={useColorModeValue('gray.100', 'gray.900')}
        py="4"
        borderRadius="md"
        direction={{ base: 'column', md: 'row' }}
      >
        <VStack w="full" px="8">
          <FormControl isRequired isInvalid={validation.farm_name === false}>
            <FormLabel htmlFor="farm_name">Nome da fazenda</FormLabel>
            <Input
              id="farm_name"
              name="farm_name"
              value={supervision.farm_name}
              onChange={(e) =>
                handleChange({ name: e.target.name, value: e.target.value })
              }
              placeholder="Nome da fazenda"
            />
          </FormControl>

          <FormControl isRequired isInvalid={validation.farm_city === false}>
            <FormLabel htmlFor="farm_city">Cidade da fazenda</FormLabel>
            <Input
              id="farm_city"
              name="farm_city"
              value={supervision.farm_city}
              onChange={(e) =>
                handleChange({ name: e.target.name, value: e.target.value })
              }
              placeholder="Cidade da fazenda"
            />
          </FormControl>

          <FormControl isRequired isInvalid={validation.farmer_name === false}>
            <FormLabel htmlFor="farmer_name">Nome do fazendeiro</FormLabel>
            <Input
              id="farmer_name"
              name="farmer_name"
              value={supervision.farmer_name}
              onChange={(e) =>
                handleChange({ name: e.target.name, value: e.target.value })
              }
              placeholder="Nome do fazendeiro"
            />
          </FormControl>

          <FormControl
            isRequired
            isInvalid={validation.supervisor_name === false}
          >
            <FormLabel htmlFor="supervisor_name">Nome do supervisor</FormLabel>
            <Input
              id="supervisor_name"
              name="supervisor_name"
              value={supervision.supervisor_name}
              onChange={(e) =>
                handleChange({ name: e.target.name, value: e.target.value })
              }
              placeholder="Nome do supervisor"
            />
          </FormControl>
        </VStack>
        <VStack w="full" px="8">
          <FormControl isRequired isInvalid={validation.type === false}>
            <FormLabel as="legend">Tipo do checklist</FormLabel>
            <RadioGroup defaultValue={supervision.type} h="32px" mt="4">
              <Radio
                onChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
                name="type"
                value="BPA"
                mr="4"
              >
                BPA
              </Radio>
              <Radio
                onChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
                name="type"
                value="antibiotico"
                mr="4"
              >
                Antibiótico
              </Radio>
              <Radio
                onChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
                name="type"
                value="BPF"
                mr="4"
              >
                BPF
              </Radio>
            </RadioGroup>
          </FormControl>

          <FormControl isRequired isInvalid={validation.milk_amount === false}>
            <FormLabel htmlFor="milk_amount">
              Quantidade de leite produzida no mês
            </FormLabel>
            <InputGroup size="md">
              <NumberInput
                min={0}
                w="full"
                defaultValue={supervision.milk_amount}
              >
                <NumberInputField
                  borderRightRadius="none"
                  id="milk_amount"
                  name="milk_amount"
                  placeholder="Quantidade de leite produzida no mês"
                  onChange={(e) =>
                    handleChange({ name: e.target.name, value: e.target.value })
                  }
                />
              </NumberInput>
              <InputRightAddon children="litros" />
            </InputGroup>
          </FormControl>

          <FormControl isRequired isInvalid={validation.cow_heads === false}>
            <FormLabel htmlFor="cow_heads">
              Quantidade de cabeça de gado
            </FormLabel>
            <NumberInput min={0} defaultValue={supervision.cow_heads}>
              <NumberInputField
                id="cow_heads"
                name="cow_heads"
                placeholder="Quantidade de cabeça de gado"
                onChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
              />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="supervised">Supervisão do mês</FormLabel>
            <Checkbox
              id="supervised"
              name="supervised"
              isChecked={supervision.supervised}
              onChange={(e) =>
                handleChange({ name: e.target.name, value: e.target.checked })
              }
              mt="2"
            >
              Supervisionado
            </Checkbox>
          </FormControl>
        </VStack>
      </Stack>

      <FormControl
        isRequired
        isInvalid={
          validation.latitude === false && validation.longitude === false
        }
        mt="4"
      >
        <FormLabel textAlign="center">Localização</FormLabel>
        <VisuallyHidden>
          <Input
            isDisabled={true}
            id="latitude"
            name="latitude"
            value={supervision.latitude}
            onChange={(e) =>
              handleChange({ name: e.target.name, value: e.target.value })
            }
            placeholder="Latitude"
          />
          <Input
            isDisabled={true}
            id="longitude"
            name="longitude"
            value={supervision.longitude}
            onChange={(e) =>
              handleChange({ name: e.target.name, value: e.target.value })
            }
            placeholder="Longituge"
          />
        </VisuallyHidden>
        <FormHelperText textAlign="center" mb="4">
          Selecione a localização clicando no mapa
        </FormHelperText>
      </FormControl>

      <Box h="320px">
        <MapWithNoSSR
          farmName={supervision.farm_name}
          marker={{
            lat: supervision.latitude,
            lng: supervision.longitude,
          }}
          handleClick={(latlng) => {
            handleChange({ name: 'latitude', value: latlng.lat });
            handleChange({ name: 'longitude', value: latlng.lng });
          }}
        />
      </Box>

      <Center>
        <Button
          display={{ base: 'flex', md: 'none' }}
          onClick={handleSubmit}
          isLoading={isSubmitting}
          loadingText="Salvando"
          colorScheme="linkedin"
          w="full"
          my="4"
        >
          Salvar alterações
        </Button>
      </Center>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(
    `http://challenge-front-end.bovcontrol.com/v1/checkList/${id}`
  );
  const data = await res.json();

  return { props: { data } };
}

export default EditSupervision;
