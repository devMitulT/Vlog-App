import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';


import { useGetFeedPost } from '../lib/queries';

const HomePage = () => {
  const { data: posts, isLoading } = useGetFeedPost();

  return (
    <>
      {isLoading ? (
        <div className='loading-text'>Loading...</div>
      ) : (
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
              Home Feed
            </Text>

            <div className='bg-dark-1 flex flex-col items-center justify-center flex-1 w-full'>
              <ul className='flex flex-col flex-1 gap-9 w-full '>
                {posts?.map((post) => (
                  <li key={post} className='flex justify-center w-full'>
                    <PostCard postId={post} />
                  </li>
                ))}
              </ul>
            </div>
          </Flex>
        </div>
      )}
    </>
  );
};

export default HomePage;
