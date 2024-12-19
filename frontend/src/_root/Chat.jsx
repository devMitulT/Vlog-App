import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Conversation from '../components/Conversation';
import MessageContainer from '../components/MessageContainer';
import { useGetConversation } from '../lib/queries';
import { useUserContext } from '../lib/AuthContext';
import { useSocket } from '../lib/SocketContext';

const Chat = () => {
  const { conversations, setConversations } = useUserContext();

  const { data, isLoading } = useGetConversation();
  const { selectedMessager, setSelectedMessager } = useUserContext();
  const { onlineUsers } = useSocket();

  useEffect(() => {
    setConversations(data);
  }, [isLoading]);

  return (
    <div className='flex flex-1'>
      <Flex
        m={10}
        flexDirection='row'
        justifyContent={'space-between'}
        className='w-full max-w-screen-md '
      >
        <Flex
          alignItems={'center'}
          w='40%'
          border={'solid 1px'}
          borderRadius={5}
          flexDirection={'column'}
        >
          <Text>Your Conversation</Text>
          <Flex flexDirection={'row'} m={1}>
            <Input type='text' placeholder='search user' />
            <Button>
              <SearchIcon />
            </Button>
          </Flex>
          {isLoading &&
            [0, 1, 2, 3, 4].map((el) => (
              <Flex key={el} flexDirection={'row'} alignItems={'center'} m={1}>
                <SkeletonCircle size={10} />
                <Flex m={1} flexDirection={'column'}>
                  <Skeleton h={'10px'} w={'80px'} m={1} />
                  <Skeleton h={'8px'} w={'160px'} />
                </Flex>
              </Flex>
            ))}

          {conversations?.map((conversation, index) => (
            <Conversation
              key={index}
              conversation={conversation}
              isOnline={onlineUsers.includes(
                conversation?.participants[0]?._id
              )}
            />
          ))}
        </Flex>

        <Flex
          justifyContent={'center'}
          w='60%'
          border={'solid 1px'}
          borderRadius={5}
          alignItems={'center'}
          flexDirection={'column'}
          height={'400px'}
        >
          {selectedMessager ? (
            <MessageContainer />
          ) : (
            <Text>Select Conversation To message someone</Text>
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default Chat;
