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
import { useLoginUser } from '../lib/queries';
import { useUserContext } from '../lib/AuthContext';

const SignInForm = () => {
  const { mutateAsync: loginUser } = useLoginUser();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [inputs, setInputs] = useState({ email: '', password: '' });

  const { checkAuthUser, isLoading, showToast } = useUserContext();

  const handleSignIn = async () => {
    const data = await loginUser(inputs);

    if (!data) {
      showToast('Login sailed please try again', 'Fail');
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      showToast('Log in to your account', 'Success');

      navigate('/');
    } else {
      showToast('Login failed please try again', data.error);
    }
  };

  const handleClick = () => setShow(!show);
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id='email' isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type='email'
              placeholder={'Enter your email address'}
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
              variant={'solid'}
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
              onClick={handleSignIn}
            >
              {isLoading ? <Spinner /> : 'Sign In'}
            </Button>

            <Stack direction={{ base: 'row' }}>
              <Text>Don't Have Account ? Please Sign Up</Text>

              <Link to={'/sign-up'}>
                <Button
                  sx={{
                    color: 'pink.500',
                  }}
                  variant={'link'}
                  color={'pink'}
                  marginLeft={79}
                >
                  Sign Up
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default SignInForm;
