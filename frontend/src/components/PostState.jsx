import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useSetLikeUnlike } from '../lib/queries';
import liked from '../../public/liked.png';
import like from '../../public/like.png';

const PostState = ({ post, currentUser }) => {
  const { mutateAsync: likeUnlikePost, isPending: isLoading } =
    useSetLikeUnlike();

  const checkIsLiked = (likeList, userId) => {
    return likeList?.includes(userId);
  };

  const handleLikeUnlikePost = async (e) => {
    e.preventDefault();
    const data = await likeUnlikePost(post?._id);

    if (!data) {
      console.log('Error');
    }
  };

  return (
    <Flex padding={5}>
      {isLoading ? (
        ''
      ) : (
        <Button
          padding={0}
          sx={{
            backgroundColor: '#101012',
            _hover: { backgroundColor: '#101012' },
          }}
          onClick={handleLikeUnlikePost}
        >
          <Image
            marginBottom={1.5}
            src={checkIsLiked(post?.likes, currentUser?.id) ? liked : like}
            h={5}
            w={5}
            alt={'like'}
          />
        </Button>
      )}

      <Text fontSize={20}>Liked by {post?.likes?.length} people</Text>
    </Flex>
  );
};

export default PostState;
