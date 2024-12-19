import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { IoSendSharp } from 'react-icons/io5';
import { useUserContext } from '../lib/AuthContext';
import { useState } from 'react';
import { useSendMessage } from '../lib/queries';
const MessageInput = ({ setMessages }) => {
  const { selectedMessager, setConversations } = useUserContext();
  const [messageText, setMessageText] = useState('');

  const { mutateAsync: sendMessage, isPending } = useSendMessage();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText) return;

    try {
      const data = await sendMessage({
        recipientId: selectedMessager?.user?._id,
        message: messageText,
      });

      setMessages((messages) => [...messages, data.newMessage]);
    } catch (err) {
      console.log(err);
    }
    setMessageText('');
  };
  return (
    <form>
      <InputGroup>
        <Input
          w={'full'}
          placeholder='Type a message'
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <InputRightElement onClick={handleSendMessage}>
          <IoSendSharp />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
