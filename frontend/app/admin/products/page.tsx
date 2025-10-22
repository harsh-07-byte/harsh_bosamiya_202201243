'use client';

import { useState, useEffect } from 'react';
import api from '../../../lib/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    category: '',
    description: '',
    stock: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, formData);
        alert('Product updated!');
      } else {
        await api.post('/products', formData);
        alert('Product created!');
      }
      setFormData({ sku: '', name: '', price: '', category: '', description: '', stock: '' });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      alert('Failed to save product');
    }
  };

  const handleEdit = (product: any) => {
    setFormData({
      sku: product.sku,
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description || '',
      stock: product.stock.toString()
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Manage Products</h1>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded mb-8">
        <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit' : 'Create'} Product</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="SKU"
            value={formData.sku}
            onChange={(e) => setFormData({...formData, sku: e.target.value})}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            className="border px-4 py-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="border px-4 py-2 rounded md:col-span-2"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {editingId ? 'Update' : 'Create'} Product
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({ sku: '', name: '', price: '', category: '', description: '', stock: '' });
            }}
            className="mt-4 ml-2 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="space-y-4">
        {products.map((product: any) => (
          <div key={product._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{product.name}</h3>
              <p>SKU: {product.sku} | Price: ${product.price} | Stock: {product.stock}</p>
              <p className="text-gray-600">{product.category}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
