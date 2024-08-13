import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex justify-center m-5 text-2xl'>
      <div className='mb-5'>
        <Link href='/users'>
          <button className='self-start border-2 p-4 rounded-lg mb-3'>
            Go to users
          </button>
        </Link>
      </div>
    </main>
  );
}
