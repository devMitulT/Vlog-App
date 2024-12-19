import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useGetPostFromId } from '../lib/queries';

import { useUserContext } from '../lib/AuthContext';
import { Link } from 'react-router-dom';
import PostState from './PostState';

const PostCard = ({ postId }) => {
  const { data, isLoading } = useGetPostFromId(postId);

  const [count, setCount] = useState(0);
  const { user: currentUser } = useUserContext();

  const handleInc = () => {
    setCount(count + 1);
  };

  const handleDec = () => {
    setCount(count - 1);
  };

  return (
    <>
      {isLoading ? (
        <div className='loading-text'>Loading...</div>
      ) : (
        <div className='bg-dark-3 rounded-3xl border my-3 border-pink-500 p-5 lg:p-7 w-full max-w-screen-xs'>
          <Flex flexDirection='column'>
            <Link to={`/profile/${data?.user._id}`}>
              <Flex>
                <Avatar src={'user?.profilePic'} />
                <Flex flexDirection='column' marginLeft={5}>
                  <Text fontSize={20}> @{data?.user?.username}</Text>
                  <Text fontSize={20}>{data?.user?.name}</Text>
                </Flex>
              </Flex>
            </Link>
            <Text fontSize={17} margin={2}>
              {data?.post?.text}
            </Text>
            <Text margin={2} fontSize={16} color='pink.200'>
              {data?.post?.tags}
            </Text>
            <div className='flex justify-center'>
              <Button
                marginTop={125}
                marginRight={5}
                isDisabled={count === 0}
                onClick={handleDec}
                padding={5}
              >
                <ArrowLeftIcon />
              </Button>
              <Box className='flex justify-center'>
                <Image
                  src={data?.post?.img[count]}
                  alt={''}
                  className='mx-auto'
                />
              </Box>
              <Button
                marginTop={125}
                marginLeft={5}
                isDisabled={count === data?.post?.img?.length - 1}
                onClick={handleInc}
              >
                <ArrowRightIcon />
              </Button>
            </div>
            <PostState post={data.post} currentUser={currentUser} />
          </Flex>
        </div>
      )}
    </>
  );
};

export default PostCard;
