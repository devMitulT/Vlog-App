import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUserFromId,
  loginUser,
  signUpUser,
  getFeedPost,
  setLikeUnlike,
  getPostById,
  getConversation,
  getMessages,
  sendMessage,
  updateUserProfile,
} from './api';

//Auth API

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (inputs) => loginUser(inputs),
  });
};

export const useSignupUSer = () => {
  return useMutation({
    mutationFn: (inputs) => signUpUser(inputs),
  });
};

//User API

export const useGetUserFromId = () => {
  return useMutation({
    mutationFn: (id) => getUserFromId(id),
  });
};

export const useFollowUnFollowUser = () => {
  return useMutation({
    mutationFn: (id) => useFollowUnFollowUser(id),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (inputs) => updateUserProfile(inputs),
  });
};

//Post API

export const useGetFeedPost = () => {
  return useQuery({
    queryKey: ['getFeedPosts'],
    queryFn: () => getFeedPost(),
    onError: (error) => {
      console.error('Error fetching feed posts:', error);
    },
  });
};

export const useSetLikeUnlike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => setLikeUnlike(postId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['post', data?.id],
      });
    },
  });
};

export const useGetPostFromId = (postId) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
    onError: (error) => {
      console.error('Error fetching post:', error);
    },
  });
};

//Message Api
export const useGetConversation = () => {
  return useQuery({
    queryKey: ['getConversation'],
    queryFn: () => getConversation(),
    onError: (error) => {
      console.error('Error fetching feed posts:', error);
    },
  });
};

export const useGetMessage = (oId) => {
  return useQuery({
    queryKey: ['getMessage', oId],
    queryFn: () => getMessages(oId),
    onError: (error) => {
      console.error('Error fetching feed posts:', error);
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputs) => sendMessage(inputs),
  });
};
