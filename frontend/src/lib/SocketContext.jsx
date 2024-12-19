import { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './AuthContext';
import io from 'socket.io-client';
const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      query: {
        userId: user.id,
      },
    });

    setSocket(socket);

    socket.on('getOnlineUsers', (users) => {
      setOnlineUsers(users);
    });

    return () => socket && socket.close();
  }, [user.id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
