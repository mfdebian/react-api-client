'use client';

import { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <main className='flex min-h-screen flex-col p-24 text-2xl'>
      {users.length === 0 && <div className='self-center'>Loading...</div>}
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
