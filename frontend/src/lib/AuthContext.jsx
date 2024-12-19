import { createContext, useContext, useEffect, useState } from 'react';
import { getProfileFromId } from './api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/toast';

export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  profilePic: '',
  followers: [],
  followings: [],
  bio: '',
};

const AuthContext = createContext(INITIAL_USER);

export function AuthProvider({ children }) {
  const toast = useToast();
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedMessager, setSelectedMessager] = useState(null);

  const navigate = useNavigate();

  const showToast = (title, description) => {
    toast({
      title: title,
      description: description,
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  const checkAuthUser = async () => {
    setIsLoading(true);

    try {
      const currentAccount = await getProfileFromId();

      if (currentAccount !== 'Not logged in') {
        setUser({
          id: currentAccount._id,
          name: currentAccount.name,
          username: currentAccount.username,
          bio: currentAccount.bio,
          email: currentAccount.email,
          profilePic: currentAccount.profilePic,
          followers: currentAccount.followers,
          followings: currentAccount.following,
        });
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem('authenticated');
    if (id !== null || id !== undefined || id !== '') {
      navigate('/sign-in');
    }
    checkAuthUser();
  }, []);

  const value = {
    user,
    checkAuthUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    showToast,
    selectedMessager,
    setSelectedMessager,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
