import { Avatar, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const SerachUserCard = ({ user }) => {
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
      <Link to={`/profile/${user._id}`}>
        <Flex>
          <Avatar src={user?.profilePic} size={'lg'} />

          <Flex marginLeft={5} flexDirection={'column'}>
            <Text fontSize={20}>@{user?.username}</Text>
            <Text fontSize={18}>{user?.name}</Text>
          </Flex>
        </Flex>
      </Link>
    </Flex>
  );
};

export default SerachUserCard;
