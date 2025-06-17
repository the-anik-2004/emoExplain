import {Navigate,Outlet} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user,loading } = useAuth(); 

  if(loading){
    return(
      <div className='flex justify-center items-center min-h-screen text-white'>
        <p>LOADING...</p>
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;