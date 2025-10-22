import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold mb-8">Welcome to E-Shop</h1>
      <p className="text-xl mb-8 text-gray-600">Your one-stop destination for quality products</p>
      <Link href="/products" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700 inline-block">
        Browse Products
      </Link>
    </div>
  );
}
