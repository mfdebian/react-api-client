import { useState } from 'react';
import type { User } from './definitions.d';

function EditUser({
  user,
  setUsers,
  setEditingUserId,
}: {
  user: User;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setEditingUserId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const [name, setName] = useState<string>(user.name);
  const [username, setUsername] = useState<string>(user.username);
  const [email, setEmail] = useState<string>(user.email);
  const [phone, setPhone] = useState<string>(user.phone);
  const [website, setWebsite] = useState<string>(user.website);

  const saveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if the id is different than 1...10 then it was created by the client
    let clientCreatedId;
    if (!Array.from({ length: 10 }, (_, i) => i + 1).includes(user.id)) {
      clientCreatedId = user.id;
    }

    let userToSave = {
      id: clientCreatedId ? 1 : user.id, // fake id for the api if client created
      name,
      username,
      email,
      phone,
      website,
    };

    const response = await fetch(
      `http://localhost:8080/users/${userToSave.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userToSave),
      }
    );
    let data = await response.json();

    if (clientCreatedId) {
      data.id = clientCreatedId;
    }

    setUsers((prevState) =>
      prevState.map((u) => (u.id === user.id ? data : u))
    );
    setEditingUserId(null);
  };

  return (
    <form onSubmit={saveUser}>
      <p>
        <span className='font-bold'>name: </span>
        <input
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          className='mb-1 rounded-lg text-black'
        />
      </p>
      <p>
        <span className='font-bold'>username: </span>
        <input
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          className='mb-1 rounded-lg text-black'
        />
      </p>
      <p>
        <span className='font-bold'>email: </span>
        <input
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='mb-1 rounded-lg text-black'
        />
      </p>
      <p>
        <span className='font-bold'>phone: </span>
        <input
          name='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Phone'
          className='mb-1 rounded-lg text-black'
        />
      </p>
      <p>
        <span className='font-bold'>website: </span>
        <input
          name='website'
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder='Website'
          className='mb-1 rounded-lg text-black'
        />
      </p>
      <button
        type='submit'
        className='self-start border-2 p-2 mb-5 mr-2 rounded-lg'
      >
        Confirm Changes
      </button>
      <button
        onClick={() => setEditingUserId(null)}
        className='self-start border-2 p-2 mb-5 rounded-lg'
      >
        Cancel
      </button>
    </form>
  );
}

export default EditUser;
