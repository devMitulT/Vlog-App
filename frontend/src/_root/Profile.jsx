import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useFollowUnFollowUser, useGetUserFromId } from '../lib/queries';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../lib/AuthContext';

export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  profilePic: '',
  followers: [],
  following: [],
  bio: '',
};

const Profile = () => {
  const [user, setUser] = useState(INITIAL_USER);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useUserContext();
  const { mutateAsync: followUnfollow } = useFollowUnFollowUser();

  const { mutateAsync: getUser, isPending: isLoading } = useGetUserFromId();

  const handleFollowButton = async (e) => {
    console.log(user?._id);
    e.preventDefault();
    const data = await followUnfollow(user?._id);

    if (!data) {
      console.log('Error');
    }
  };

  const checkIsFollowed = () => {
    if (user?.followers.includes(currentUser.id)) {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  useEffect(() => {
    const userProfile = async (id) => {
      const data = await getUser(id);

      if (!data) {
        console.log('No user Found');
      } else {
        setUser(data);
      }
    };

    userProfile(id);
  }, [id]);

  const handleEditButton = () => {
    navigate('/update-profile');
  };

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
                src={user.profilePic}
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
                <Button onClick={handleFollowButton}>
                  {checkIsFollowed ? 'UnFollow' : 'Follow'}
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
