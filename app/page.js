'use client';

import { useRouter } from 'next/navigation';
import PaymentDetailsCard from '@/components/PaymentDetailsCard';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  const handleStartPayment = () => {
    router.push('/payment');
  };

  useEffect(() => {
      localStorage.removeItem('paymentStatus');
      localStorage.removeItem('errorMessage');
      localStorage.removeItem('lastSelectedCard');
    }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto">
        <PaymentDetailsCard />
        <div className="px-4 mt-6">
          <button
            onClick={handleStartPayment}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </main>
  );
}