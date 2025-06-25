import { useState, useEffect } from 'react';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../context/AuthContext'; 

interface FavoriteButtonProps {
  favorites: string[] | undefined;
  hexcode: string;
}

const FavoriteButton = ({ favorites, hexcode }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {setUser}=useAuth();

  useEffect(() => {
    if (favorites && hexcode) {
        setIsFavorite(favorites.includes(hexcode));
        setUser((prev)=>prev?{...prev,favorites:favorites}:prev);
    }else{
      setIsFavorite(false);
    }
  }, [favorites, hexcode]);


 const handleToggleFavorite = async () => {
  setLoading(true);
  try {
    const res = await api.post('/favorites/toggle', { hexcode });
    if (res.data?.favorites) {
      setIsFavorite(res.data.favorites.includes(hexcode));
      setUser(prev => prev ? { ...prev, favorites: res.data.favorites } : prev);
    }
  } catch (err: any) {
    console.error(err);
    if (err.response) {
      alert(`Failed: ${err.response.data?.message || 'Server error'}`);
    } else if (err.request) {
      alert("No response from server. Please check your network.");
    } else {
      alert("An unexpected error occurred.");
    }
  } finally {
    setLoading(false);
  }
}

  
  return (
    <button
      onClick={handleToggleFavorite}
      disabled={loading}
      className={`flex items-center justify-center space-x-2 w-full font-semibold my-4 rounded-lg 
        px-4 py-3 text-lg transition bg-amber-400 cursor-pointer
        ${isFavorite 
            ? 'bg-pink-600 text-gray-900 hover:bg-pink-800' 
            : 'bg-black/40 text-amber-400 hover:bg-amber-400 hover:text-gray-900 hover:shadow-lg'} 
        ${loading && 'opacity-50 cursor-not-allowed'}`}
    >
      {!isFavorite && <FontAwesomeIcon icon={['fas', 'heart']} />}
      <span>{isFavorite ? 'Treasured! 💛' : 'Treasure It'}</span>
    </button>
  );
};

export default FavoriteButton;

