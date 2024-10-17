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
    });

    const data = await response.json();
    localStorage.setItem('authenticated', data.id);

    return data;
  } catch (e) {
    console.log(e.message);
  }
};

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
