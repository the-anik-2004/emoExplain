import  { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
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

interface EmoExplainUser {
    username:string;
    email:string;
    password?:string;
    isVerified:boolean;
    otp?:string;
    otpExpires?:Date;
    favorites:string[];
    searchHistory:string[];
    googleId?:string;
}

const TreasuredSection = ({user}:{user:EmoExplainUser}) => {
    const [emojiDetails,setEmojiDetails]=useState<Emoji[]>([]);
    
    useEffect(()=>{
        const fetchEmojis=async()=>{
            if(!user?.favorites || user.favorites.length===0)return;

            try {
                //fetch emoji details for each hexcode in parallel
                const responses= await Promise.all(
                    user.favorites.slice(0,10).map((hex: string)=>
                        api.get(`/emojis/${hex}`).then(res=>res.data)
                    )
                )
                setEmojiDetails(responses);
            } catch (error) {
                console.error('Error fetching favorite emojis:', error);
            }
        }
        fetchEmojis();
    },[user?.favorites]);

    
  return (
      <section className="flex-1 mt-6 mr-6 rounded-r-xl bg-black/50 border border-gray-400 p-4 shadow-lg flex flex-col gap-4">
        <h1 className="text-xl md:text-2xl font-semibold tracking-wider mb-2 text-white ">
          🤍 Treasured
        </h1>
        <hr className="text-white mb-4" />
        
        {user?.favorites.length !> 0 ? (
          <div className="flex gap-3 overflow-x-auto py-2 hide-scrollbar">
            {emojiDetails.slice(0,10).map((emo, index) => (
              <Link
                key={index}
                to={`/emoji/${emo.hexcode}`}
                state={{emoji:emo.hexcode}}
                className="lg:text-8xl md:text-6xl text-4xl aspect-square p-3 rounded-full bg-black/40 shadow-inner shadow-amber-100 hover:bg-black/60 transition"
              >
                {emo.emoji}
              </Link>
            ))}
      
          </div>

        ) : (
          <p className="text-sm text-gray-400">
            Oops! Seems like you haven't Treasured any emoji yet...
          </p>
        )}
        <Link to={'/favorites'} className='text-right hover:text-amber-300 hover:underline cursor-pointer'>See more...</Link>
      </section>
  )
}

export default TreasuredSection;
