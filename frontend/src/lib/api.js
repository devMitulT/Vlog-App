//Auth Api

import { useUserContext } from './AuthContext';

export const signUpUser = async (inputs) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });

    const data = await response.json();

    localStorage.setItem('authenticated', data._id);

    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const loginUser = async (inputs) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
      credentials: 'include',
    });

    const data = await response.json();
    localStorage.setItem('authenticated', data.id);

    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const logOutUser = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    localStorage.removeItem('authenticated');

    return data;
  } catch (err) {
    console.log(err.message);
  }
};

//User Api

export const getProfileFromId = async () => {
  const authId = localStorage.getItem('authenticated');

  if (authId === undefined || authId === 'undefined' || authId === null) {
    return 'Not logged in';
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/users/profile/${authId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getUserFromId = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/profile/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const followUnfollowUser = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/follow/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const searchUser = async (ini) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/people/${ini}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e.message);
  }
};

//Post api

export const getFeedPost = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/feed`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();

    const postIds = data.map((post) => post._id);
    return postIds;
  } catch (err) {
    console.log(err.message);
  }
};

export const setLikeUnlike = async (postId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/posts/like/${postId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const post = await response.json();

    const user = await getUserFromId(post.postedBy);

    return { post, user };
  } catch (err) {
    console.log(err.message);
  }
};

//message api

export const getConversation = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/messages/conversations`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getMessages = async (oId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/messages/${oId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const sendMessage = async (inputs) => {
  try {
    const response = await fetch('http://localhost:3000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
      credentials: 'include',
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e.message);
  }
};
