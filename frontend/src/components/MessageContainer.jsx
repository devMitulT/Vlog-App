import {
  Avatar,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import { useUserContext } from '../lib/AuthContext';
import { useGetMessage } from '../lib/queries';
import { useSocket } from '../lib/SocketContext';
import { getMessages } from '../lib/api';

const MessageContainer = () => {
  const { selectedMessager, user: currentUser } = useUserContext();
  // const { data, isLoading } = useGetMessage(selectedMessager?.user?._id);

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { socket } = useSocket();

  useEffect(() => {
    socket?.on('newMessage', (message) => {
      setMessages((prevMe) => [...prevMe, message]);
    });

    return () => socket.off('newMessage');
  }, [socket, isLoading]);

  useEffect(() => {
    const getMessage = async () => {
      setIsLoading(true);
      try {
        const data = await getMessages(selectedMessager?.user?._id);

        setMessages(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getMessage();
  }, [socket]);

  return (
    <Flex
      mt={20}
      flex='70'
      flexDirection={'column'}
      bg={'gray.800'}
      borderRadius={'md'}
      w='full'
    >
      <Flex h={12} alignItems={'center'} gap={2} bg={'black'} w={'full'}>
        <Avatar src={selectedMessager?.user?.profilePic} size={'sm'} ml={3} />
        <Text display={'flex'} align>
          {selectedMessager?.user?.username}
        </Text>
      </Flex>

      <Divider />

      <Flex
        flexDir={'column'}
        gap={4}
        mt={4}
        height={'400px'}
        overflowY={'scroll'}
      >
        {isLoading && [
          [...Array(10)].map((el, index) => (
            <Flex
              key={`flex-item-${index}`} // Ensure a unique key by combining index with a prefix
              gap={2}
              alignItems={'center'}
              p={1}
              borderRadius={'md'}
              alignSelf={index % 2 === 0 ? 'flex-start' : 'flex-end'}
            >
              {index % 2 === 0 && <SkeletonCircle size={7} />}

              <Flex flexDir={'column'} gap={2}>
                <Skeleton h='8px' w='250px' />
                <Skeleton h='8px' w='250px' />
                <Skeleton h='8px' w='250px' />
              </Flex>

              {index % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          )),
        ]}

        {!isLoading &&
          messages?.map((message, index) => (
            <Message
              key={index}
              ownMessage={message?.sender === currentUser.id}
              message={message}
            />
          ))}
      </Flex>
      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
