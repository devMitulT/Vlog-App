import { Avatar, Flex } from '@chakra-ui/react';
import React from 'react';

const SerachUserCard = ({user}) => {
  return (
    <Flex
      margin={3}
      border={'black'}
      borderRadius={5}
      borderColor={'white'}
      borderStyle={'solid'}
      padding={5}
      borderWidth={0.1}
    >
      <Avatar src={user?.profilePic} size={'lg'} />

      <Flex marginLeft={5} flexDirection={'column'}>
        <Text fontSize={20}>@{user?.username}</Text>
        <Text fontSize={18}>{user?.name}</Text>
      </Flex>

      {/* {currentUser?.id !== user?._id && (
          <FollowUnFollowButton currentUser={currentUser} user={user} />
        )} */}
    </Flex>
  );
};

export default SerachUserCard;
