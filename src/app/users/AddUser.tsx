import { useState } from 'react';
import type { User } from './definitions.d';
import { v4 as uuidv4 } from 'uuid';

const AddUser = ({
  setUsers,
  setShowAddUser,
}: {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setShowAddUser: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  const saveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let userToSave = {
      name,
      username,
      email,
      phone,
      website,
    };

    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userToSave),
    });
    let data = await response.json();
    data.id = uuidv4();

    setUsers((prevState) => [data, ...prevState]);

    setName('');
    setUsername('');
    setEmail('');
    setPhone('');
    setWebsite('');
    setShowAddUser(false);
  };

  return (
    <form onSubmit={saveUser}>
      <p>
        <input
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          className='mb-3 rounded-lg p-1 text-black'
        />
      </p>
      <p>
        <input
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          className='mb-3 rounded-lg p-1 text-black'
        />
      </p>
      <p>
        <input
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='mb-3 rounded-lg p-1 text-black'
        />
      </p>
      <p>
        <input
          name='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Phone'
          className='mb-3 rounded-lg p-1 text-black'
        />
      </p>
      <p>
        <input
          name='website'
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder='Website'
          className='mb-3 rounded-lg p-1 text-black'
        />
      </p>
      <button type='submit' className='self-start border-2 p-4 rounded-lg'>
        Save
      </button>
    </form>
  );
};

export default AddUser;
