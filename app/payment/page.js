'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PaymentForm from '@/components/PaymentForm';
import PaymentSuccess from '@/components/PaymentSuccess';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const processUuid = searchParams.get('processUuid') || 'e7d1bf34-7bb2-468e-9853-0b685637b3e5';
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const status = localStorage.getItem('paymentStatus');
      const errorMessage = localStorage.getItem('errorMessage');
      setPaymentStatus(status);
      setError(errorMessage);
    } catch (e) {
      console.error('Error accessing storage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto text-center">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto">
        {paymentStatus === 'success' ? (
          <PaymentSuccess processUuid={processUuid} />
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            {error && (
              <div className="p-4 border-b border-red-100 bg-red-50">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-red-600">
                    {error}
                  </div>
                </div>
              </div>
            )}
            <PaymentForm
              processUuid={processUuid}
              onPaymentStatusChange={setPaymentStatus}
            />
          </div>
        )}
      </div>
    </main>
  );
}