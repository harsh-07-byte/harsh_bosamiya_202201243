'use client';

import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const items = cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));
      await api.post('/orders', { items });
      clearCart();
      alert('Order placed successfully!');
      router.push('/orders');
    } catch (error) {
      alert('Failed to place order');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.productId} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p>Price: ${item.price} x {item.quantity}</p>
                  <p className="font-bold">Subtotal: ${item.price * item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <p className="text-2xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
