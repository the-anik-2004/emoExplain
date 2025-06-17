import './App.css';
import Navbar from './components/Navbar.tsx';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Search from './pages/Search.tsx';
import UnderDevelopment from './pages/UnderDevelopment.tsx';
import EmojiDetail from './pages/EmojiDetail.tsx';
import DeveloperContact from './pages/DeveloperContact.tsx';
import { useEffect, useState } from 'react';
import PrivateRoute from './routes/PrivateRoute.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register.tsx';


function App() {
  const bgIamages: string[] = [
    '/bg-2.jpg', '/bg-1.jpg', '/bg-3.jpg', '/bg-4.jpg', '/bg-5.jpg',
    '/bg-6.jpg', '/bg-7.jpg', '/bg-8.jpg', '/bg-9.jpg', '/bg-10.jpg',
    '/bg-11.jpg', '/bg-12.jpg', '/bg-13.jpg', '/bg-14.jpg', '/bg-15.jpg',
    '/bg-16.jpg', '/bg-17.jpg'
  ];

  const [bgIndex, setBgIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % bgIamages.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgIamages[bgIndex]})`;
  }, [bgIndex]);

  return (
   
  
        <div className='h-screen w-full flex flex-col-reverse sm:flex-row justify-center items-center gap-2'>
          <Navbar />
          <div className='h-[85vh] sm:h-[90vh] w-[90vw] bg-black/50 backdrop-blur-sm rounded-2xl shadow-lg border-1 border-gray-400 overflow-y-scroll scroll-smooth hide-scrollbar'>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/favorites" element={<UnderDevelopment feature='Favorite' />} />
                <Route path="/user" element={<UnderDevelopment feature='Personalized Profile' />} />
                <Route path="/emoji/:hexcode" element={<EmojiDetail />} />
                <Route path="/dev" element={<DeveloperContact />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </div>
 
  );
}

export default App;
