import React,{ useState } from 'react';
import axios from 'axios';

const Register:React.FC=()=>{
    const[email,setEmail]=useState('');
    const[otp,setOtp]=useState('');
    const[step,setStep]=useState<'email'|'otp'>('email');

    //handle email submit
    const handleEmailSubmit=async()=>{
        try{
            await axios.post('http://localhost:5000/api/auth/register',{email},{withCredentials:true});
            setStep('otp');
        }catch(error){
            console.error('Registration error', error);
        }
    };

    //handle OTP Submit
    const handleOtpSubmit=async()=>{
        try {
            const res =await axios.post('http://localhost:5000/api/auth/verify',{email,otp},{withCredentials:true});
            console.log("Verification Success",res.data);
        } catch (error) {
            console.error('OTP verification error', error);
        }
    }
  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {step === 'email' ? 'Register with Email' : 'Verify OTP'}
      </h2>
      {step === 'email' ? (
        <>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleEmailSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleOtpSubmit}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Verify
          </button>
        </>
      )}
    </div>
  </div>
);

}

export default Register;