'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../lib/api';
import { useCart } from '../../../context/CartContext';

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${params.id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product');
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity
      });
      alert('Product added to cart!');
    }
  };

  if (!product) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-200 h-96 rounded flex items-center justify-center">
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-full object-cover" />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <p className="text-3xl font-bold text-green-600 mb-4">${product.price}</p>
          <p className="mb-4">{product.description}</p>
          <div className="flex gap-4 items-center mb-4">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border px-4 py-2 rounded w-20"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
