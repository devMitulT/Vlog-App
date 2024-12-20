import { useEffect, useState } from 'react';
import { Avatar, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useFollowUnFollowUser, useGetUserProfile } from '../lib/queries';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../lib/AuthContext';
import { followUnfollowUser } from '../lib/api';

export const INITIAL_USER = {
  _id: '',
  name: '',
  username: '',
  email: '',
  profilePic: '',
  followers: [],
  following: [],
  bio: '',
};

const Profile = () => {
  const { user: currentUser } = useUserContext();

  const [user, setUser] = useState(INITIAL_USER);
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isPending: isLoading } = useGetUserProfile(id);
  const { mutateAsync: followUnfollow, isPending } = useFollowUnFollowUser();

  const followUnfollowButton = async (e) => {
    e.preventDefault();

    try {
      const data = await followUnfollow(user?._id);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUser(data);
  }, [id, isPending]);

  const handleEditButton = () => {
    navigate('/update-profile');
  };
  console.log(user.followers);

  return (
    <div className='bg-dark-1 flex flex-1'>
      <Flex
        align='left'
        justify='center'
        width='70vw'
        flexDirection={'column'}
        margin={10}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Flex flexDirection={'column'}>
            <Flex justify={'center'} align={'center'}>
              <Avatar
                src={user?.profilePic}
                size='2xl'
                sx={{ borderColor: 'pink.600' }}
              />
              <Flex flexDirection={'column'} marginLeft={5}>
                <Text fontSize={35}> {user.name} </Text>

                <Text fontSize={25} sx={{ color: 'gray.500' }}>
                  @{user.username}
                </Text>
              </Flex>

              {currentUser.id === user._id ? (
                <Button margin={10} onClick={handleEditButton}>
                  Edit Profile
                </Button>
              ) : (
                ''
              )}
            </Flex>

            <Flex
              justify={'start'}
              align={'center'}
              marginTop={4}
              marginLeft={8}
              paddingX={5}
            >
              <Text
                fontSize={20}
                textAlign='center'
                maxWidth='600px'
                color='gray.600'
              >
                {user.bio}
              </Text>
            </Flex>
            <Flex margin={7} justifyContent={'space-between'}>
              <Flex
                justify={'center'}
                align={'center'}
                flexDirection={'column'}
              >
                <Text fontSize={25} margin={1}>
                  Posts
                </Text>
                <Text fontSize={25} margin={1}>
                  0
                </Text>
              </Flex>
              <Flex
                justify={'center'}
                align={'center'}
                flexDirection={'column'}
              >
                <Text fontSize={25} margin={1}>
                  Following
                </Text>
                <Text fontSize={25} margin={1}>
                  {user.following.length}
                </Text>
              </Flex>
              <Flex
                justify={'center'}
                align={'center'}
                flexDirection={'column'}
              >
                <Text fontSize={25} margin={1}>
                  Followers
                </Text>
                <Text fontSize={25} margin={1}>
                  {user.followers.length}
                </Text>
              </Flex>
            </Flex>
            <Flex justify={'center'} align='center'>
              {currentUser.id !== user._id ? (
                <Button onClick={followUnfollowButton}>
                  {user?.followers.includes(currentUser.id)
                    ? 'UnFollow'
                    : 'Follow'}
                </Button>
              ) : (
                ''
              )}
            </Flex>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Profile;
