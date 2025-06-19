import { useState, useEffect } from 'react';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FavoriteButtonProps {
  favorites?: string[];
  emoji: string;
}

const FavoriteButton = ({ favorites, emoji }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (favorites?.includes(emoji)) {
      setIsFavorite(true);
    }
  }, [favorites, emoji]);

  const handleToggleFavorite = async () => {
    if (!favorites) {
      alert('Please Log in to save Treasures!');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/favorites/toggle', { emoji });
      if (res.data?.favorites) {
        setIsFavorite(res.data.favorites.includes(emoji));
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };
  
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

