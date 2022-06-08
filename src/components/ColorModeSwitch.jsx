import { Icon, IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const label = () =>
    colorMode === 'light' ? 'Apagar as luzes' : 'Acender as luzes';

  return (
    <Tooltip label={label()}>
      <IconButton
        onClick={toggleColorMode}
        aria-label={label()}
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        variant="ghost"
      />
    </Tooltip>
  );
};

export default ColorModeSwitch;
