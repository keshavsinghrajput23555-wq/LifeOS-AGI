'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    await fetch('/api/auth/otp', { method: 'POST', body: JSON.stringify({ phone }) });
    setLoading(false);
  };

  return <div className="mx-auto max-w-md p-4"><input className="w-full rounded border p-2" placeholder="+91..." value={phone} onChange={(e)=>setPhone(e.target.value)} /><button onClick={sendOtp} className="mt-3 rounded bg-brandBlue px-4 py-2 text-white">{loading ? 'Sending...' : 'Send OTP'}</button></div>;
}
