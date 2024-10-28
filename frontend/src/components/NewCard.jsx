import { useEffect, useState } from 'react';
import { useGetPostFromId, useGetUserFromId } from '../lib/queries';
import { getPostById } from '../lib/api';

const NewCard = ({ postId }) => {
  //
  const { data: post } = useGetPostFromId(postId);
  console.log(post);
  return <div>{}</div>;
};

export default NewCard;
