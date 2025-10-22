import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <div className="h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full object-cover" />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <p className="text-xl font-bold text-green-600">${product.price}</p>
      <Link href={`/products/${product._id}`} className="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        View Details
      </Link>
    </div>
  );
}
