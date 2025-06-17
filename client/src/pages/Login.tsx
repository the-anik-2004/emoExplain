import React,{useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin} from '@react-oauth/google';



const Login:React.FC = () => {
  const {login,setUser} = useAuth();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [errorMsg,setErrorMsg]=useState('');
  const redirect=useNavigate();

  //handle Login submit
  const handleSubmit=async (e:React.FormEvent)=>{
    e.preventDefault();
    setErrorMsg('');

    try {
      const res=await login(email,password);
      setUser(res.user);
      redirect('/');
    } catch (error:any) {
      setErrorMsg(error.response?.data?.message||'Login Failed');
    }
  };

  //handle Google Login
 const handleGoogleSuccess=async (credentialResponse:any)=>{
    try {
      const {credential}=credentialResponse;
      const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        credentials:'include',
        body:JSON.stringify({tokenId:credential})
      });

      const data= await res.json();

      if(res.ok){
        setUser(data.user);
        redirect('/');
      }else{
        setErrorMsg(data.message || "Google login failed");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Google login error');
    }
  }




  return (
    <div className='flex  flex-col justify-center items-center h-screen overflow-y-hidden '>
          <div className='bg-black/10 backdrop-blur p-6 rounded-xl shadow-md w-[90%] h-fit m-4 max-w-md border border-gray-500'>
                  <h2 className='text-2xl font-semibold text-center text-white mb-4 ' >Login to <span className ="text-amber-300 text-shadow-orange-800 text-shadow-lg hover:text-shadow-orange-600 "style={{fontFamily:'emoFont'}}>emoExplain</span></h2>
                  {errorMsg && (
                    <div className='text-red-300  bg-red-950 p-2 text-sm rounded-md text-center mb-4 border-1'>
                      {errorMsg}
                    </div>
                  )}

                  {/* Login Form */}
                  <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input 
                      type="email"
                      placeholder='email'
                      value={email}
                      onChange={e=>setEmail(e.target.value)}
                      required
                      className='p-3 rounded-md bg-black/40 text-amber-400 border border-amber-400  focus:text-white'
                      />

                      <input 
                      type="password"
                      placeholder='password'
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                      required
                      className='p-3 rounded-md bg-black/40 text-amber-400 border border-amber-400  focus:text-white'
                      />

                       <button
                          type="submit"
                          className="bg-amber-400 hover:bg-amber-500 transition p-2 rounded-md text-amber-900 font-semibold cursor-pointer"
                        >Login</button>
                  </form>
                  
                  <div className="text-center mt-4 text-white text-sm">
                        Don’t have an account?{' '}
                        <Link to="/register" className="text-amber-500 hover:underline">
                          Register here
                        </Link>
                  </div>

                <div className="mt-6 flex justify-center w-full ">
                  <div className="w-full max-w-[400px]">
                    <GoogleLogin
                      size="large"
                      width="100%"  // This ensures it uses the container's width
                      logo_alignment="center"
                      onSuccess={handleGoogleSuccess}
                      onError={() => setErrorMsg("Google Login Failed")}
                    />
                  </div>
                </div>


                
          </div>
      </div>
  )
}

export default Login
