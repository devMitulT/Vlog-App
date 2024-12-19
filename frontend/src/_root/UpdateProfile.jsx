import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useUserContext } from '../lib/AuthContext';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePreviewImg from '../lib/usePreviewImg';
import { useUpdateUser } from '../lib/queries';

const UpdateProfile = () => {
  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  const { user, showToast } = useUserContext();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: user.username,
    name: user.name,
    email: user.email,
    bio: user.bio,
  });

  const { handleImageChange, imgUrl } = usePreviewImg();
  const fileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateUser({ inputs, profilePic: imgUrl });
      showToast('Succesfully', data.message);
      console.log(data);
      navigate(`/profile/${user?.id}`);
    } catch (err) {
      showToast('Error', err.message);
    }
  };

  const handleCancel = () => {
    navigate(`/profile/${user?.id}`);
  };

  console.log(inputs);
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      minW={'100vh'}
      bg={useColorModeValue('black', 'black')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.900')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id='userName'>
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size='xl' src={imgUrl || user.profilePic}></Avatar>
            </Center>
            <Center w='full'>
              <Button w='full' onClick={() => fileRef.current.click()}>
                Change Icon
              </Button>
              <Input
                type='file'
                hidden
                ref={fileRef}
                onChange={handleImageChange}
              />
            </Center>
          </Stack>
        </FormControl>
        <FormControl id='userName' isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            defaultValue={user?.username}
            _placeholder={{ color: 'gray.500' }}
            type='text'
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </FormControl>
        <FormControl id='Name' isRequired>
          <FormLabel> Name</FormLabel>
          <Input
            defaultValue={user?.name}
            _placeholder={{ color: 'gray.500' }}
            type='text'
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
        </FormControl>

        <FormControl id='email' isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            defaultValue={user?.email}
            _placeholder={{ color: 'gray.500' }}
            type='email'
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </FormControl>

        <FormControl id='bio'>
          <FormLabel>Bio</FormLabel>
          <Input
            defaultValue={user.bio}
            _placeholder={{ color: 'gray.500' }}
            type='text'
            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w='full'
            _hover={{
              bg: 'red.500',
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w='full'
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleSubmit}
          >
            {isPending ? <Spinner /> : 'Submit'}
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default UpdateProfile;
