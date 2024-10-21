import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const CreatePost = () => {
  return (
    <div className='bg-dark-1 flex flex-1'>
      <Flex
        flexDirection='column'
        className='w-full max-w-screen-md items-center'
      >
        <Text
          marginLeft={10}
          as='b'
          marginTop={5}
          fontSize='3xl'
          className='text-center'
        >
          Create Post +
        </Text>

        <div className='flex flex-col items-center justify-center flex-1 w-full'></div>
      </Flex>
    </div>
  );
};

export default CreatePost;
