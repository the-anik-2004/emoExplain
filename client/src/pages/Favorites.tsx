import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SkeletonLoader from "../components/SkeletonLoader";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

interface Emoji {
  emoticons: string | string[];
  subgroup: string;
  unicode: string;
  emoji: string;
  annotation: string;
  group: string;
  hexcode: string;
  tags: string[];
  order: number;
}

const Favorites = () => {
    const { user } = useAuth();
  const [favoriteEmojis, setFavoriteEmojis] = useState<Emoji[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || !user.favorites.length) {
        setFavoriteEmojis([]);
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/emojis/all"); // adjust if you have a specific endpoint
        if (Array.isArray(res.data)) {
          const favs = res.data.filter((emoji: Emoji) =>
            user.favorites.includes(emoji.hexcode)
          );
          setFavoriteEmojis(favs);
        }
      } catch (err) {
        console.error("Failed to fetch favorite emojis", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

    return (
       <div>
          <h1 className="font-extrabold  text-4xl sm:text-6xl text-center mt-4 tracking-wider">😉 emoExplainer</h1>
          <h2 className="
            text-3xl sm:text-4xl font-extrabold mb-8
            text-amber-400
            bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300
            bg-clip-text
            drop-shadow-lg
            animate-pulse
            select-none
          ">
            💛 My Treasures
          </h2>


      {/* Favorites grid */}
      {loading ? (
        <SkeletonLoader count={12} style="w-16 h-16 rounded-xl bg-zinc-900/50 border" />
      ) : favoriteEmojis.length === 0 ? (
        <p className="text-gray-400 italic">You have no favorite emojis yet!</p>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6 p-4">
        {favoriteEmojis.map((emoji, index) => (
          <Link
            key={index}
            to={`/emoji/${emoji.hexcode}`}
            state={{ emoji }}
            title={`View ${emoji.emoji}`}
            className="
              text-4xl sm:text-6xl p-4 rounded-3xl
              bg-gradient-to-tr from-amber-500 to-pink-500
              shadow-lg shadow-pink-600/70
              text-white
              flex flex-col items-center justify-center
              transition
              transform
              hover:scale-110
              hover:shadow-[0_0_15px_5px_rgba(245,158,11,0.75),0_0_25px_10px_rgba(236,72,153,0.6)]
              hover:animate-bounce
              cursor-pointer
              select-none
               gap-4
            "
          >
            {emoji.emoji}
           <p className="text-lg capitalize font-semibold">{emoji.annotation}</p> 
          </Link>
        ))}
      </div>

      )}
       </div>
    )
  }
  
  export default Favorites