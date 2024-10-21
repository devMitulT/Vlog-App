import { Avatar, Button, Container, Flex, Text } from '@chakra-ui/react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import NavButton from './NavButton';
import { sidebar } from '../lib/constantns';
import { SunIcon } from '@chakra-ui/icons';
import { useUserContext } from '../lib/AuthContext';
import { logOutUser } from '../lib/api';

const NavBar = () => {
  const { user, setIsAuthenticated, isAuthenticated } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const active = { bg: 'pink.400', color: 'white', hover: { bg: 'pink.600' } };
  const notActive = {
    bg: 'black',
    color: 'pink.400',
    hover: { bg: 'black', color: 'white' },
  };

  const handleLogOut = async () => {
    const data = await logOutUser();

    if (!data) {
      console.log('Log Out failed');
    }

    setIsAuthenticated(false);

    if (data) {
      navigate('/sign-in');
    }
  };

  return (
    <div className='text-white bg-dark-4 border-r-2 border-pink-600'>
      <Flex
        width={250}
        justifyContent='center'
        textAlign='center'
        flexDirection='column'
        className='items-center'
      >
        <Button
          margin={4}
          padding={8}
          sx={{ over: { bg: 'pink.600' }, backgroundColor: 'pink.400' }}
        >
          <NavLink to='/'>
            <Flex alignItems='center' justifyContent='center'>
              <SunIcon w={8} h={8} marginRight={3} />
              <Text fontSize='3xl'>VlogSter</Text>
            </Flex>
          </NavLink>
        </Button>
        <div className='border border-pink-600 w-full' />{' '}
        <div className='bg-dark-2 m-3 w-full'>
          <Container margin={3}>
            <Flex alignItems='center' justifyContent='center'>
              <Link to={`/profile/${user.id}`}>
                <Avatar size='lg' name={user.username} src={user.profilePic} />
              </Link>
              <Flex marginLeft={5} flexDirection='column' textAlign='center'>
                <Text fontSize='xl'>@{user.username}</Text>
                <Text fontSize='xl'>{user.name}</Text>
              </Flex>
            </Flex>
          </Container>
        </div>
        <div className='border border-pink-600 w-full' />{' '}
        <ul className='w-full flex flex-col items-center'>
          {sidebar.map((el) => (
            <li key={el.name}>
              <NavButton
                name={el.name}
                link={el.link}
                style={pathname === el.link ? notActive : active}
              />
            </li>
          ))}
        </ul>
        <div className='border border-pink-600 w-full' />{' '}
        <Button
          margin={5}
          padding={6}
          marginTop={180}
          bg='pink.400'
          color='white'
          _hover={{ bg: 'pink.600' }}
          onClick={handleLogOut}
        >
          <Text fontSize='xl'>Logout</Text>
        </Button>
      </Flex>
    </div>
  );
};

export default NavBar;
