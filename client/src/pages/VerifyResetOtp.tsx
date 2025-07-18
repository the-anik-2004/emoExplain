import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const VerifyResetOtp = () => {
  const { state } = useLocation();
  const email = state?.email;
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false); // ✅ loading state
  const redirect = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.post('/auth/verify-reset-otp', { email, otp });
      if (res.status === 200) {
        alert('✅ OTP verified!');
        redirect('/reset-password', { state: { email } });
      }
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-black/10 backdrop-blur p-6 rounded-xl shadow-md w-[90%] h-fit m-4 max-w-md border border-gray-500 flex flex-col gap-4'
      >
        <h2 className='text-2xl text-center font-bold mb-4'>
          <span
            className='text-amber-300 text-shadow-orange-800 text-shadow-lg hover:text-shadow-orange-600'
            style={{ fontFamily: 'emoFont' }}
          >
            emoExplain
          </span>
          <br />
          Verify OTP
        </h2>

        {errorMsg && (
          <div className='text-red-300 bg-red-950 p-2 text-sm rounded-md text-center mb-4 border-1'>
            {errorMsg}
          </div>
        )}

        <input
          required
          type='text'
          placeholder='Enter OTP'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className='text-center p-3 rounded-md bg-black/40 text-amber-400 border border-amber-400 focus:text-white'
        />

        <button
          type='submit'
          disabled={loading}
          className={`transition p-2 rounded-md text-black font-semibold cursor-pointer ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-amber-400 hover:bg-amber-500'
          }`}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default VerifyResetOtp;
