'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { sendMessageToNative } from '@/utils/sendMessageToNative';

export default function PaymentSuccess({ processUuid }) {
  const router = useRouter();
  const policyNumber = `PET-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const hasSentMessage = useRef(false);

  useEffect(() => {
    localStorage.removeItem('paymentStatus');
    localStorage.removeItem('errorMessage');
    localStorage.removeItem('lastSelectedCard');

    if (!hasSentMessage.current) {
      sendMessageToNative({ pageId: 'paymentSuccess', message: 'User is on the payment success page' });
      hasSentMessage.current = true;
    }
  }, []);

  return (
    <div className="max-w-md mx-auto text-center p-6">
      <div className="mb-8">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <div className="h-8 w-4 border-r-2 border-b-2 border-green-500 transform rotate-45 mt-[-4px]"></div>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Congratulations!
      </h2>
      <p className="text-gray-600 mb-8">
        Your pet insurance policy has been successfully purchased.
        You'll receive an email with all the policy details shortly.
      </p>
      <div className="text-sm text-gray-500 mb-8">
        Policy Number: #{policyNumber}
        <br />
        Transaction ID: {processUuid}
      </div>
      <button
        onClick={() => router.push('/')}
        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Return to Homepage
      </button>
    </div>
  );
}