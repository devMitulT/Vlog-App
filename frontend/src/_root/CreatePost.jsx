import {
  Button,
  Checkbox,
  Flex,
  Box,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  IconButton,
} from '@chakra-ui/react';

import React, { useRef, useState } from 'react';
import usePreviewImg from '../lib/usePreviewImg';
import { CloseIcon } from '@chakra-ui/icons';
import { useUserContext } from '../lib/AuthContext';

const CreatePost = () => {
  const { user } = useUserContext();
  const fileRef = useRef(null);
  const { handleImageChange, imgUrl } = usePreviewImg();
  const [data, setData] = useState({ postedBy: user.id, text: '', tags: '' });
  const [imageArray, setImageArray] = useState([]);

  const addImageToArray = (newImgUrl) => {
    setImageArray((prevArray) => [...prevArray, newImgUrl]);
  };

  if (imgUrl && !imageArray.includes(imgUrl)) {
    addImageToArray(imgUrl);
  }

  const handleCount = () => {
    setImgCount(imgCount + 1);
  };

  const handleDecCount = () => {
    setImgCount(imgCount - 1);
  };
  const [imgCount, setImgCount] = useState(0);

  const handlePostButton = (e) => {
    e.preventDefault();
    console.log({ data, imageArray });
  };

  return (
    <div className='bg-dark-1 flex flex-1'>
      <Flex
        flexDirection='column'
        className='w-full max-w-screen-md items-center'
      >
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}> Create Post +</Heading>
            <FormControl id='caption'>
              <FormLabel>Add Caption</FormLabel>
              <Input
                type='text'
                onChange={(e) => setData({ ...data, text: e.target.value })}
              />
            </FormControl>
            <FormControl id='tags'>
              <FormLabel>Tags</FormLabel>
              <Input
                type='text'
                onChange={(e) => setData({ ...data, tags: e.target.value })}
              />
            </FormControl>

            <Stack spacing={6}>
              <Button
                colorScheme={'blue'}
                variant={'solid'}
                onClick={() => fileRef.current.click()}
              >
                <Input
                  type='file'
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
                Add Images
              </Button>
            </Stack>
            <Box
              width={{ base: '100%', sm: '85%' }}
              zIndex='2'
              marginLeft={{ base: '0', sm: '5%' }}
              marginTop='5%'
              border={1}
              borderColor={'white'}
            >
              <Box textDecoration='none' _hover={{ textDecoration: 'none' }}>
                <Image
                  borderRadius='lg'
                  src={imageArray[0] ? imageArray[0] : 'public/photo.png'}
                  alt='some good alt text'
                  objectFit='contain'
                />
              </Box>
            </Box>

            {Array.from({ length: imgCount }).map((_, index) => (
              <>
                <Stack spacing={6}>
                  <Button
                    colorScheme={'blue'}
                    variant={'solid'}
                    onClick={() => fileRef.current.click()}
                  >
                    <Input
                      type='file'
                      hidden
                      ref={fileRef}
                      onChange={handleImageChange}
                    />
                    Add Images
                  </Button>
                </Stack>
                <Box
                  width={{ base: '100%', sm: '85%' }}
                  zIndex='2'
                  marginLeft={{ base: '0', sm: '5%' }}
                  marginTop='5%'
                  border={1}
                  borderColor={'white'}
                >
                  <Box
                    position='relative'
                    display='inline-block'
                    textDecoration='none'
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Image
                      borderRadius='lg'
                      src={
                        imageArray[index + 1]
                          ? imageArray[index + 1]
                          : 'public/photo.png'
                      }
                      alt='some good alt text'
                      objectFit='contain'
                    />
                    {!imageArray[index + 1] && (
                      <IconButton
                        icon={<CloseIcon />}
                        aria-label='Close'
                        position='absolute'
                        top='0'
                        right='0'
                        m={2} // margin to add space from the edge
                        size='sm'
                        background='rgba(0, 0, 0, 0.6)' // optional: background for better visibility
                        color='white'
                        onClick={handleDecCount}
                      />
                    )}
                  </Box>
                </Box>
              </>
            ))}

            <Text fontSize={20}>Want to Add More ? </Text>

            <Button onClick={handleCount}> + </Button>

            <Stack spacing={6}>
              <Button
                colorScheme={'blue'}
                variant={'solid'}
                onClick={handlePostButton}
              >
                Post
              </Button>
            </Stack>
          </Stack>
        </Flex>

        <div className='flex flex-col items-center justify-center flex-1 w-full'></div>
      </Flex>
    </div>
  );
};

export default CreatePost;
