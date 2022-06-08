import {
  Box,
  Container,
  HStack,
  Icon,
  IconButton,
  Link,
  Spacer,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { GiGroupedDrops } from 'react-icons/gi';
import { FaGithub } from 'react-icons/fa';
import ColorModeSwitch from './ColorModeSwitch';

const Navbar = () => {
  const bgColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bgColor} mt="1" p="1" borderRadius="4">
      <Container maxW={'container.lg'}>
        <HStack>
          <NextLink href="/">
            <Text
              fontSize="2xl"
              decoration="none"
              style={{ cursor: 'pointer' }}
            >
              <Icon as={GiGroupedDrops} mr="2" />
              Milk Check
            </Text>
          </NextLink>
          <Spacer />
          <ColorModeSwitch />
          <Tooltip label="Ver repositório">
            <Link
              href="https://github.com/leonardo015/milk-hiring-challenge"
              isExternal={true}
            >
              <IconButton
                aria-label="Ver repositório"
                icon={<FaGithub />}
                variant="ghost"
              />
            </Link>
          </Tooltip>
        </HStack>
      </Container>
    </Box>
  );
};
export default Navbar;
