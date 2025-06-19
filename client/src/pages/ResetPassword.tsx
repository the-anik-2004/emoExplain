import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

const ResetPassword = () => {
  const { state } = useLocation();
  const email = state?.email;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const redirect = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/reset-password', { email, newPassword: password });
      if (res.status === 200) {
        alert("✅ Password reset successfully. Please login.");
        redirect('/login');
      }
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Failed to reset password");
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
          <br /> Reset Password
        </h2>

        {errorMsg && (
          <div className='text-red-300 bg-red-950 p-2 text-sm rounded-md text-center mb-4 border-1'>
            {errorMsg}
          </div>
        )}

        <div className='relative'>
          <input
            required
            type={showPassword ? 'text' : 'password'}
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-3 pr-10 rounded-md bg-black/40 text-amber-400 border border-amber-400 focus:text-white'
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-3 text-white text-sm'
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <div className='relative'>
          <input
            required
            type={showPassword ? 'text' : 'password'}
            placeholder='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full p-3 pr-10 rounded-md bg-black/40 text-amber-400 border border-amber-400 focus:text-white'
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-3 text-white text-sm'
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          type='submit'
          disabled={loading}
          className={`transition p-2 rounded-md text-black font-semibold ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-amber-400 hover:bg-amber-500 cursor-pointer'
          }`}
        >
          {loading ? 'Saving...' : 'Set New Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
