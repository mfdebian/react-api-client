'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import AddUser from './AddUser';
import EditUser from './EditUser';
import type { User } from './definitions.d';

const DisplayUser = ({
  user,
  setEditingUserId,
}: {
  user: User;
  setEditingUserId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  return (
    <div>
      <p>
        <span className='font-bold'>name: </span>
        {user.name}
      </p>
      <p>
        <span className='font-bold'>username: </span>
        {user.username}
      </p>
      <p>
        <span className='font-bold'>email: </span>
        {user.email}
      </p>
      <p>
        <span className='font-bold'>phone: </span>
        {user.phone}
      </p>
      <p>
        <span className='font-bold'>website: </span>
        {user.website}
      </p>
      <button
        className='border-2 p-1 rounded-lg mt-1 mb-3'
        onClick={() => setEditingUserId(user.id)}
      >
        Edit this user
      </button>
      <br />
    </div>
  );
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <main className='flex min-h-screen flex-col p-24 text-2xl'>
      <div className='mb-5'>
        <Link href='/'>
          <button className='self-start border-2 p-4 rounded-lg m-3'>
            Home
          </button>
        </Link>
        <button
          className='self-start border-2 p-4 rounded-lg mb-3'
          onClick={() => setShowAddUser(!showAddUser)}
        >
          Add User
        </button>
        {showAddUser && (
          <AddUser setUsers={setUsers} setShowAddUser={setShowAddUser} />
        )}
      </div>
      {users.length === 0 && (
        <div className='self-center'>Loading users...</div>
      )}
      {users.length > 0 &&
        users.map((user) =>
          editingUserId === user.id ? (
            <EditUser
              key={user.id}
              user={user}
              setUsers={setUsers}
              setEditingUserId={setEditingUserId}
            />
          ) : (
            <DisplayUser key={user.id} user={user} setEditingUserId={setEditingUserId} />
          )
        )}
    </main>
  );
}
