import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FontAwesomeIcon } from '../../public/icons';
import TreasuredSection from '../components/TreasuredSection';
import { useEffect, useState } from 'react';




const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [recentSearch,setRecentSearch]=useState([]);

  useEffect(()=>{
    const fetchRecentSearchHistory=async ()=>{
      try {
        const res=await api.get('/emojis/search/recent-searches');
        if(res.data?.searchHistory){
          setRecentSearch(res.data.searchHistory);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if(user)fetchRecentSearchHistory();
  },[user]);


  
  const handleLogout = async () => {
  try {
    const res = await api.post("/auth/logout"); // Just this is enough
    if (res.status === 200) {
      setUser(null);
      navigate("/login");
    }
  } catch (error) {
    console.error(error);
    alert("Logout failed. Try again later.");
  }
};

   const handleClearHistory = async () => {
    try {
      await api.delete('/emojis/recent-searches');
      setRecentSearch([]);
    } catch (err) {
      console.error("Error clearing search history", err);
    }
  }


  return (
    
     user && <div className='h-full w-full flex md:flex-row flex-col-reverse  '>
      <aside className=' lg:flex-2/3 flex-1/2  flex flex-col gap-6 md:overflow-hidden overflow-scroll ' >
          {/* Favorites */}
          <TreasuredSection user={user}/>


          {/* recent  */}
          <section className='flex-1  bg-black/50 mb-6 ml-6 rounded-l-2xl border border-amber-400  px-4 py-2'>
              <h1 className=' lg:text-2xl md:text-xl text-lg tracking-wider cursor-none text-amber-400 '>
                Recent Searches
              </h1>
              <hr  className='text-amber-400'/>

                {
                  recentSearch.length>0 && (
                  <button
                    onClick={handleClearHistory}
                    className="text-sm sm:text-base text-red-400 hover:underline focus:outline-none focus:ring-1 focus:ring-red-400 rounded cursor-pointer hover:backdrop-blur p-2 mb-4"
                  >
                    <FontAwesomeIcon icon={['fas','trash-arrow-up']}/> Clear All
                  </button>
                  )
                }

                <div className='flex flex-wrap gap-4'>
            {
            recentSearch.length===0 ?
            (
              <p className='text-lg italic text-gray-400'>No recent searches</p>
            ):(
              recentSearch.map((searchItem,index)=>(
                  <span
                  key={index}
                  className=' cursor-pointer hover:underline text-amber-200 bg-gray-300/30 px-4 py-2 rounded-full hover:bg-zinc-900/50 border'
                  title={`Search for "${searchItem}"`}
                  >{searchItem}</span>
              ))
            )
            }
          </div>
          </section>
      
      
      </aside>
      
        <aside className=" lg:flex-1/3 flex-1/2 w-full md:w-64 bg-black/50 p-6 flex flex-col items-center rounded-2xl border border-amber-300 my-2 mr-2">
             <div className='flex flex-col items-center overflow-y-auto md:h-screen'>

               {/* Avatar */}
              <img
                src={`https://api.dicebear.com/9.x/bottts/svg?seed=${encodeURIComponent(user?.email || 'guest')}`}
                alt="User Avatar"
                className="w-24 h-24 text-center rounded-full border-2 mt-4 border-amber-400 shadow-md ring-2 ring-amber-300 mb-4"
              />

              {/* App name */}
              <h2 className="text-3xl font-bold mb-2 text-center text-amber-300 text-shadow-orange-800 text-shadow-lg hover:text-shadow-orange-600 " style={{ fontFamily: 'emoFont' }}>
                emoExplain
              </h2>

              {/* Welcome message */}
              <div className="mb-6 text-center">
                <p className="text-sm text-gray-400 font-semibold">Welcome,</p>
                <p className="text-lg font-bold break-words">
                  {user?.username || user?.email}
                </p>
              </div>

                {/* Deatails */}
                <div className="flex flex-col space-y-2 w-full  font-semibold ">
                    <section className=' text-blue-400 text-lg'>
                          <FontAwesomeIcon icon={['fas', `envelope`] }  /> : {user?.email}
                      </section>

                      <section className="text-lg text-pink-600">
                              <FontAwesomeIcon icon={['fas', `heart`] }  /> : {user?.favorites.length}
                      </section>

                      <section className="text-lg text-teal-600">
                            <FontAwesomeIcon icon={['fas', 'laptop']} /> : 
                            {
                              user && 'googleId' in user 
                                ? `Login via Google Account`
                                : `Login via Email`
                            }
                          </section>


                </div>

                {/* Logout button */}
                <div className="mt-auto w-full">
                  <button
                    onClick={handleLogout}
                    className="mt-4 flex items-center justify-center space-x-2 bg-amber-400 hover:bg-red-500 text-black hover:text-white font-semibold w-full py-2 rounded cursor-pointer"
                  >
                    <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
                    <span>Logout</span>
                  </button>
                </div>
             </div>
        </aside>


     
    </div>
  );
};

export default Dashboard;


