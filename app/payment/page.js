'use client';

import { Suspense } from 'react';
import PaymentContent from '@/components/PaymentContent';

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <Suspense
        fallback={
          <div className="max-w-md mx-auto text-center">
            Loading...
          </div>
        }
      >
        <PaymentContent />
      </Suspense>
    </main>
  );
}
