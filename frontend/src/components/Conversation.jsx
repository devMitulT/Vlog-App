import {
  Avatar,
  AvatarBadge,

  Flex,
  Stack,
  Text,
  WrapItem,
} from '@chakra-ui/react';
import { useUserContext } from '../lib/AuthContext';
import { BsCheck2All } from 'react-icons/bs';

const Conversation = ({ conversation, isOnline }) => {
  const {
    user: currentUser,
    selectedMessager,
    setSelectedMessager,
  } = useUserContext();
  const user = conversation?.participants[0];

  const changeConversation = () => {
    setSelectedMessager({ id: conversation?._id, user });
  };

  return (
    <button
      className={
        selectedMessager?.id === conversation?._id ? 'bg-slate-800' : ''
      }
      onClick={changeConversation}
    >
      <Flex
        gap={4}
        alignItems={'center'}
        p={'1'}
        borderRadius={'5'}
        bg={'redi.500'}
      >
        <WrapItem>
          <Avatar
            src={user?.profilePic}
            size={{ base: 'xs', sm: 'sm', md: 'md' }}
          >
            {isOnline ? <AvatarBadge boxSize={'1em'} bg='green.300' /> : ''}
          </Avatar>
        </WrapItem>

        <Stack direction={'column'} fontSize={'sm'}>
          <Text fontWeight='700' display={'flex'} alignItems='center'>
            {user?.username}{' '}
          </Text>

          <Text fontSize={'xs'} display={'flex'} alignItems={'center'} gap={1}>
            {currentUser.id === conversation?.lastMessage?.sender ? (
              <BsCheck2All size={16} />
            ) : (
              ''
            )}
            {conversation?.lastMessage?.text.length > 18
              ? conversation?.lastMessage?.text.slice(0, 18) + '...'
              : conversation?.lastMessage?.text}
          </Text>
        </Stack>
      </Flex>
    </button>
  );
};

export default Conversation;
