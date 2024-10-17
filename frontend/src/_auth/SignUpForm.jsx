import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupUSer } from '../lib/queries';
import { useUserContext } from '../lib/AuthContext';

const SignUpForm = () => {
  const { mutateAsync: signUpUser } = useSignupUSer();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { checkAuthUser, isLoading, showToast } = useUserContext();

  const [inputs, setInputs] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const handleSignUp = async () => {
    const data = await signUpUser(inputs);

    if (!data) {
      showToast('SignUp failed please try again', 'Error');
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      setInputs({ username: '', name: '', email: '', password: '' });
      showToast('Your account is created', 'Success');

      navigate('/');
    } else {
      showToast('SignUp failed please try again', data.error);
    }
  };

  const handleClick = () => setShow(!show);
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Create your account</Heading>
          <FormControl id='username' isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              placeholder={'Enter your username'}
              value={inputs.username}
              onChange={(e) => {
                setInputs((inputs) => ({
                  ...inputs,
                  username: e.target.value,
                }));
              }}
            />
            <FormControl id='name' isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type='text'
                placeholder={'Enter your name'}
                value={inputs.name}
                onChange={(e) => {
                  setInputs((inputs) => ({ ...inputs, name: e.target.value }));
                }}
              />
            </FormControl>
          </FormControl>
          <FormControl id='email' isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type='email'
              placeholder={'Enter your email address'}
              value={inputs.email}
              onChange={(e) => {
                setInputs((inputs) => ({ ...inputs, email: e.target.value }));
              }}
            />
          </FormControl>
          <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>

            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                value={inputs.password}
                onChange={(e) => {
                  setInputs((inputs) => ({
                    ...inputs,
                    password: e.target.value,
                  }));
                }}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            ></Stack>
            <Button
              sx={{
                backgroundColor: 'pink.500',
                color: 'white',
                _hover: {
                  backgroundColor: 'pink.700',
                },
                _active: {
                  backgroundColor: 'pink.700',
                },
              }}
              variant={'solid'}
              onClick={handleSignUp}
            >
              {isLoading ? <Spinner /> : 'Sign Up'}
            </Button>

            <Stack direction={{ base: 'row' }}>
              <Text>Already Have an Account ? Please Sign in</Text>

              <Link to={'/sign-in'}>
                <Button
                  sx={{
                    color: 'pink.500',
                  }}
                  variant={'link'}
                  color={'pink'}
                  marginLeft={79}
                >
                  Sign In
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default SignUpForm;
