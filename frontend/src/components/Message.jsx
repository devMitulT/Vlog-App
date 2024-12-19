import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { useUserContext } from '../lib/AuthContext';
import { BsCheck2All } from 'react-icons/bs';

const Message = ({ ownMessage, message }) => {
  const { selectedMessager, user: currentUser } = useUserContext();

  return (
    <>
      {ownMessage ? (
        <Flex
          gap={2}
          alignSelf='flex-end'
          justifyContent='flex-end'
          w='70%'
          m={1}
        >
          <Flex maxW='350px' bg='pink.700' p={1} borderRadius='md'>
            <Text>{message?.text}</Text>
            <Box margin={1}>
              {message.seen ? <BsCheck2All size={16} /> : ''}
            </Box>
          </Flex>

          <Avatar src={currentUser?.profilePic} alt='alt' w='7' h='7' />
        </Flex>
      ) : (
        <Flex gap={2} alignSelf={'flex-start'} w='70%' m={1}>
          <Avatar
            src={selectedMessager?.user?.profilePic}
            alt='alt'
            w='7'
            h='7'
          />

          <Text maxW={'350px'} bg={'pink.400'} p={1} borderRadius={'md'}>
            {message?.text}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
