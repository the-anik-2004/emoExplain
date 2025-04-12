import React from 'react'
import { IconName, IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '../../public/icons';
import { useNavigate,useLocation } from 'react-router-dom';

const Navbar:React.FC=()=>{
    const navigate=useNavigate();
    const location=useLocation();


    const navItems: { id: string; icon: IconName; color?: string,path:string }[] = [
        { id: 'home', icon: 'house', color: 'text-blue-400',path:'/' },     
        { id: 'search', icon: 'search', color: 'text-emerald-400',path:'/search' }, 
        { id: 'favorites', icon: 'heart', color: 'text-rose-400',path:'/favorites' }, 
        { id: 'user', icon: 'user', color: 'text-yellow-400',path:'/user' },
        { id: 'dev', icon: 'laptop-code',color:'text-orange-400',path:'/dev' },
      ];

  return (
    <div className='flex  flex-row sm:flex-col items-center justify-evenly gap-10'>
        
          <nav className='flex  flex-row sm:flex-col items-center shadow-lg gap-2 sm:gap-6 h-fit w-fit bg-black/50 backdrop-blur-md p-2 sm:p-4 rounded-full  border-1 border-gray-200'>
                {
                    navItems.map((item:{id:string,icon:string,color?:string,path:string})=>{
                        const isActive:boolean =location.pathname===item.path;
                        const activeColor:string=item.color ||"text-white"
                        return(
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className={`transition-all duration-200 p-4 rounded-full cursor-pointer
                                ${isActive ? activeColor : 'text-white/50'}
                                ${isActive ?  "bg-black/15" :''}
                                `
                            }
                      >
                        <FontAwesomeIcon icon={['fas', `${item.icon}`] as IconProp} className="text-xl" />
                      </button>)
                })
                }
            </nav>
    </div>
  )
}

export default Navbar;
