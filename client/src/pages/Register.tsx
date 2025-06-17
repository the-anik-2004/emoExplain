import {useState} from 'react';
// import {useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register=()=>{
  // const {setUser}=useAuth();
  const redirect=useNavigate();

  const [email,setEmail]=useState('');
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp,setOtp]=useState('');
  const [step,setStep]=useState<'register'|'verify'>('register');
  const [errorMsg,setErrorMsg]=useState('');


  //handle Register
  const handleRegister=async(e:React.FormEvent)=>{
      e.preventDefault();
      try {
        if(password!==confirmPassword){
          setErrorMsg("Passwords do not match");
          return;
        }
        const res=await api.post('/auth/register',{username,email,password});
        if(res.status===201){
          setStep('verify');
        }
      } catch (error:any) {
        setErrorMsg(error.response?.data?.message || 'Registration failed');
      }
  }

  //verify OTP
  const handleVerify=async(e:React.FormEvent)=>{
    e.preventDefault();
    try {
      const res=await api.post('/auth/verify',{email,otp});
      if(res.status===200){
        alert('Email is verified successfully.Please Login');
        redirect('/login');
      }
    } catch (error:any) {
      setErrorMsg(error.response?.data?.message || 'OTP verification failed');
    }
  }


  return(
    <div className="flex justify-center items-center h-screen">
        <form onSubmit={step==='register'?handleRegister:handleVerify} 
        className='w-full bg-black/10 backdrop-blur max-w-md p-6 border shadow-md rounded-md'>
            <h2 className="text-xl text-center font-semibold mb-4">{step === 'register' ? 'Register' : 'Verify OTP'} in <span className ="text-amber-300 text-shadow-orange-800 text-shadow-lg hover:text-shadow-orange-600 "style={{fontFamily:'emoFont'}}>emoExplain</span></h2>
            {errorMsg && (
                    <div className='text-red-300  bg-red-950 p-2 text-sm rounded-md text-center mb-4 border-1'>
                      {errorMsg}
                    </div>
            )}
            {
              step==='register'?
              (<div className='flex flex-col gap-4'>
                  <input 
                    required
                    type="text" 
                    placeholder='Username'
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    className='p-3 rounded-md bg-black/40 text-amber-400 border border-amber-400  focus:text-white'
                  />

                  <input 
                    required
                    type="email" 
                    placeholder='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className='p-3 rounded-md bg-black/40 text-amber-400 border border-amber-400  focus:text-white'
                  />

                 <div className="relative">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 pr-10 rounded-md bg-black/40 text-amber-400 border border-amber-400 focus:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer right-3 top-3 text-white text-sm"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 pr-10 rounded-md bg-black/40 text-amber-400 border border-amber-400 focus:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer right-3 top-3 text-white text-sm"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>



                  <button type="submit" className="bg-amber-400  hover:bg-amber-500 transition p-2 rounded-md text-black font-semibold cursor-pointer">Register</button>
                  <p className="text-sm mt-3 text-center">
                    Already have an account? <a className="text-amber-400 hover:underline" href="/login">Login here</a>
                  </p>
              </div>
              ):(
                <div className='flex flex-col gap-4'>
                  <input 
                    required
                    type="text" 
                    placeholder='Enter OTP sent to Email'
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                    className=' text-center p-3 rounded-md bg-black/40 text-amber-400 border border-amber-400  focus:text-white'
                  />
                  <button type="submit" className="bg-amber-400  hover:bg-amber-500 transition p-2 rounded-md text-black font-semibold cursor-pointer">Verify Email</button>
                  
                </div>
                
              )
            }
        
        </form>
    </div>

  );
}

export default Register;