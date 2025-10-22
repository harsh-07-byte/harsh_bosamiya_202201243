'use client';

import { useState, useEffect } from 'react';
import api from '../../lib/api';
import Link from 'next/link';

export default function AdminDashboard() {
  const [revenue, setRevenue] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const revenueRes = await api.get('/orders/reports/daily-revenue');
      const customersRes = await api.get('/orders/reports/top-customers');
      setRevenue(revenueRes.data);
      setTopCustomers(customersRes.data);
    } catch (error) {
      console.error('Failed to fetch reports');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <Link href="/admin/products" className="bg-blue-600 text-white px-6 py-3 rounded inline-block mb-8">
        Manage Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Daily Revenue</h2>
          <div className="space-y-2">
            {revenue.slice(0, 7).map((item: any) => (
              <div key={item.date} className="border p-3 rounded">
                <p><strong>{item.date}:</strong> ${item.revenue}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Top Customers</h2>
          <div className="space-y-2">
            {topCustomers.map((customer: any) => (
              <div key={customer.email} className="border p-3 rounded">
                <p><strong>{customer.name}</strong></p>
                <p>Orders: {customer.order_count} | Total: ${customer.total_spent}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
