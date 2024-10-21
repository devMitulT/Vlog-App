import { Button, Flex, Text } from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';

const NavButton = ({ name, link, style }) => {
  return (
    <Button
      bg={style.bg}
      color={style.color}
      _hover={style.hover}
      marginTop={5}
      marginBottom={5}
      padding={6}
      width={200}
      border={3}
      borderColor={'pink.400'}
    >
      <NavLink to={link}>
        <Flex>
          <Text fontSize={'xl'}>{name}</Text>
        </Flex>
      </NavLink>
    </Button>
  );
};

export default NavButton;
