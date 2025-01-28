// components/PaymentForm.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TEST_CARDS = {
  default: {
    number: '',
    holder: '',
    expiry: '',
    cvv: '',
    label: 'Select a test card'
  },
  success: {
    number: '4111111111111111',
    holder: 'John Doe',
    expiry: '12/25',
    cvv: '123',
    label: '4111 1111 1111 1111 (Success Card)'
  },
  failure: {
    number: '4622943127013705',
    holder: 'Jane Smith',
    expiry: '08/24',
    cvv: '456',
    label: '4622 9431 2701 3705 (Failure Card)'
  }
};

export default function PaymentForm({ processUuid, onPaymentStatusChange }) {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState('default');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const lastSelectedCard = localStorage.getItem('lastSelectedCard');
    if (lastSelectedCard && TEST_CARDS[lastSelectedCard]) {
      setSelectedCard(lastSelectedCard);
      setFormData({
        cardNumber: TEST_CARDS[lastSelectedCard].number,
        cardHolder: TEST_CARDS[lastSelectedCard].holder,
        expiryDate: TEST_CARDS[lastSelectedCard].expiry,
        cvv: TEST_CARDS[lastSelectedCard].cvv
      });
    }
  }, []);

  useEffect(() => {
    const cardData = TEST_CARDS[selectedCard];
    setFormData({
      cardNumber: cardData.number,
      cardHolder: cardData.holder,
      expiryDate: cardData.expiry,
      cvv: cardData.cvv
    });
  }, [selectedCard]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');

    try {
      if (selectedCard !== 'default') {
        localStorage.setItem('lastSelectedCard', selectedCard);
      }

      if (cleanCardNumber === '4111111111111111') {
        localStorage.setItem('paymentStatus', 'success');
        localStorage.removeItem('errorMessage');
        onPaymentStatusChange('success');
        router.replace(`/payment?processUuid=${processUuid}`);
      } else if (cleanCardNumber === '4622943127013705') {
        localStorage.setItem('paymentStatus', 'failed');
        localStorage.setItem('errorMessage', 'Payment declined. Please try a different card.');
        window.location.href = `/payment?processUuid=${processUuid}`;
      } else {
        throw new Error('Invalid card number');
      }
    } catch (error) {
      localStorage.setItem('errorMessage', 'Please select a valid test card.');
      onPaymentStatusChange('failed');
      router.replace(`/payment?processUuid=${processUuid}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Information</h2>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <p className="text-sm text-blue-700">
            This is a test environment. Please select a test card number to simulate different payment scenarios.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Test Card Number
          </label>
          <select
            value={selectedCard}
            onChange={(e) => setSelectedCard(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
            disabled={isSubmitting}
          >
            {Object.entries(TEST_CARDS).map(([key, card]) => (
              <option key={key} value={key}>
                {card.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            value={formData.cardHolder}
            onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            placeholder="FULL NAME"
            required
            disabled={isSubmitting}
            readOnly
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date
            </label>
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="MM/YY"
              required
              disabled={isSubmitting}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Security Code (CVV)
            </label>
            <input
              type="text"
              maxLength="3"
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="123"
              required
              disabled={isSubmitting}
              readOnly
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || selectedCard === 'default'}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-200
            ${isSubmitting || selectedCard === 'default'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
        >
          {isSubmitting ? 'Processing...' : 'Complete Purchase'}
        </button>
      </form>
    </div>
  );
}