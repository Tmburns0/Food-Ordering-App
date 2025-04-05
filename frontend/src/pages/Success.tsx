import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Define TypeScript types for the expected API response
type PaymentStatusResponse = {
  status: string;
  customer_email?: string;
  amount_total?: number;
  currency?: string;
};

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found in URL.');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/verify-payment?session_id=${sessionId}`
          );
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data: PaymentStatusResponse = await response.json();
          setPaymentStatus(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to verify payment.');
        } finally {
          setLoading(false);
        }
      };
  
      verifyPayment();
    }, [sessionId]);
  
    if (loading) {
      return <div>Loading payment status...</div>;
    }
  
    if (error) {
      return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-6 max-w-md mx-auto mt-10 bg-green-50 rounded-lg">
          <h1 className="text-2xl font-bold text-green-800">Payment Successful!</h1>
          {paymentStatus && (
            <div className="mt-4 space-y-2">
              <p>Status: <span className="font-semibold">{paymentStatus.status}</span></p>
              {paymentStatus.customer_email && (
                <p>Email: <span className="font-semibold">{paymentStatus.customer_email}</span></p>
              )}
              {paymentStatus.amount_total && paymentStatus.currency && (
                <p>
                  Amount Paid:{' '}
                  <span className="font-semibold">
                    {(paymentStatus.amount_total / 100).toFixed(2)} {paymentStatus.currency.toUpperCase()}
                  </span>
                </p>
              )}
            </div>
          )}
          <p className="mt-6 text-gray-600">
            Thank you for your purchase! A receipt has been sent to your email.
          </p>
        </div>
      );
    }