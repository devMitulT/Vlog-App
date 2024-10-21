import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getUserFromId,
  loginUser,
  signUpUser,
  getFeedPost,
  setLikeUnlike,
} from './api';

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

export const useGetUserFromId = () => {
  return useMutation({
    mutationFn: (id) => getUserFromId(id),
  });
};

export const useGetFeedPost = () => {
  return useMutation({
    mutationFn: () => getFeedPost(),
  });
};
export const useSetLikeUnlike = () => {
  return useMutation({
    mutationFn: (postId) => setLikeUnlike(postId),
  });
};
