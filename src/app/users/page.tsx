'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import AddUser from './AddUser';
import type { User } from './definitions.d';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);

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
        {showAddUser && <AddUser setUsers={setUsers} />}
      </div>
      {users.length === 0 && (
        <div className='self-center'>Loading users...</div>
      )}
      {users.length > 0 &&
        users.map((user) => (
          <div key={user.id}>
            <li>
              <ul>
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
                <br />
              </ul>
            </li>
          </div>
        ))}
    </main>
  );
}
