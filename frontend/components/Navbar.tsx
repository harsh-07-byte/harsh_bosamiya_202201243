'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { logout } from '../lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">E-Shop</Link>
        <div className="flex gap-4 items-center">
          <Link href="/products">Products</Link>
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              <Link href="/cart">Cart</Link>
              <Link href="/orders">My Orders</Link>
              {user.role === 'admin' && <Link href="/admin">Admin</Link>}
              <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
