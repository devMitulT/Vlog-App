import { useQuery, useMutation } from '@tanstack/react-query';
import { loginUser, signUpUser } from './api';

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
