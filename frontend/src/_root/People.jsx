import React, { useEffect, useState } from 'react';
import {
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { IoSendSharp } from 'react-icons/io5';
import SerachUserCard from '../components/SerachUserCard';
import { searchUser } from '../lib/api';

const People = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(undefined);

  const handeleChangeTerm = async (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await searchUser(search);
      if (data) {
        setUsers(data);
      }
    };

    search !== '' ? getData() : '';
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsers(users);
    setSearch('');
  };

  console.log(search, users);
  return (
    <div className='bg-dark-1 flex flex-1 justify-center'>
      <Flex flexDirection={'column'}>
        <form>
          <InputGroup w={500} margin={5}>
            <Input
              w={'full'}
              placeholder='Find People Here'
              value={search}
              onChange={handeleChangeTerm}
            />
            <InputRightElement>
              <IoSendSharp />
            </InputRightElement>
          </InputGroup>
        </form>

        <Divider />

        <ul>
          {users?.map((user) => {
            <li>
              <SerachUserCard user={user} />;
            </li>;
          })}
        </ul>
      </Flex>
    </div>
  );
};

export default People;
