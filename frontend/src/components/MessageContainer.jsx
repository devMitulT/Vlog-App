import {
  Avatar,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import { useUserContext } from '../lib/AuthContext';
import { useSocket } from '../lib/SocketContext';
import { getMessages } from '../lib/api';

const MessageContainer = () => {
  const {
    selectedMessager,
    user: currentUser,
    conversations,
    setConversations,
  } = useUserContext();
  const messsageEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { socket } = useSocket();

  useEffect(() => {
    messsageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const lastMessageFromOtherUser =
      messages.length &&
      messages[messages.length - 1].sender !== currentUser.id;
    if (lastMessageFromOtherUser) {
      socket.emit('markMessagesAsSeen', {
        conversationId: messages[messages.length - 1].conversationId,
        userId: selectedMessager.id,
      });
    }

    socket.on('messagesSeen', ({ conversationId }) => {
      if (messages[messages.length - 1].conversationId === conversationId) {
        setMessages((prev) => {
          const updatedMessages = prev.map((message) => {
            if (!message.seen) {
              return {
                ...message,
                seen: true,
              };
            }
            return message;
          });
          return updatedMessages;
        });
      }
    });
  }, [socket, currentUser.id, messages, selectedMessager]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      if (selectedMessager.id === message.conversationId) {
        setMessages((prevMe) => [...prevMe, message]);
      }

      setConversations((prev) => {
        const updatedConversation = prev.map((conversation) => {
          if (conversation._id === message.conversationId) {
            return {
              ...conversation,
              lastMessage: {
                text: message.text,
                sender: message.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversation;
      });
    });

    return () => socket.off('newMessage');
  }, [socket, setConversations, selectedMessager]);

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
  }, [socket, selectedMessager]);

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
              key={`flex-item-${index}`}
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
            <Flex
              key={index}
              direction={'column'}
              ref={
                messages.length - 1 === messages.indexOf(message)
                  ? messsageEndRef
                  : null
              }
            >
              <Message
                ownMessage={message?.sender === currentUser.id}
                message={message}
              />
            </Flex>
          ))}
      </Flex>
      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
