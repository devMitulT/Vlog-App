import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useGetUserFromId } from '../lib/queries';
import liked from '../../public/liked.png';
import like from '../../public/like.png';
import { useUserContext } from '../lib/AuthContext';

const PostCard = (post) => {
  const [user, setUser] = useState({});
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { user: currentUser } = useUserContext();

  const { mutateAsync: getUser, isPending: isLoading } = useGetUserFromId();

  useEffect(() => {
    const userProfile = async (id) => {
      const data = await getUser(id);

      if (!data) {
        console.log('No user Found');
      } else {
        setUser(data);
      }
    };

    userProfile(post.post.postedBy);
  }, [post]);

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
            <Flex>
              <Avatar src={user.profilePic} />
              <Flex flexDirection='column' marginLeft={5}>
                <Text fontSize={20}> @{user.username}</Text>
                <Text fontSize={20}>{user.name}</Text>
              </Flex>
            </Flex>
            <Text fontSize={17} margin={2}>
              {post.post.text}
            </Text>

            <Text margin={2} fontSize={16} color='pink.200'>
              {post.post.tags}
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
                  src={post.post.img[count]}
                  alt={user.username}
                  className='mx-auto'
                />
              </Box>
              <Button
                marginTop={125}
                marginLeft={5}
                isDisabled={count === post.post.img.length - 1}
                onClick={handleInc}
              >
                <ArrowRightIcon />
              </Button>
            </div>

            <Flex padding={5}>
              <Button
                padding={0}
                sx={{
                  backgroundColor: '#101012',
                  _hover: { backgroundColor: '#101012' },
                }}
              >
                <Image
                  marginBottom={1.5}
                  src={isLiked ? liked : like}
                  h={5}
                  w={5}
                  alt={user.username}
                />
              </Button>
              <Text fontSize={20}>
                Liked by {post.post.likes.length} people
              </Text>
            </Flex>
          </Flex>
        </div>
      )}
    </>
  );
};

export default PostCard;
