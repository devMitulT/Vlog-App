import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { getPostById } from '../lib/api';
import { useGetFeedPost } from '../lib/queries';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: getFeedPost } = useGetFeedPost();

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const posts = await getFeedPost();

        if (!posts) {
          console.log('No post found');
        } else {
          setPosts(posts);
        }
      } catch (e) {
        console.log('first error: ' + e);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, []);

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
              {posts.map((el, index) => (
                <PostCard key={index} post={el} />
              ))}
            </div>
          </Flex>
        </div>
      )}
    </>
  );
};

export default HomePage;
