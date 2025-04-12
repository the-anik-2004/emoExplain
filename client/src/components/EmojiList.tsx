import React, { useEffect, useState } from 'react';
import EmojiCard from './EmojiCard';
import SkeletonLoader from './SkeletonLoader';

interface Emoji {
  emoji: string;
  annotation: string;
  group: string;
  hexcode:string;
}

const EmojiList: React.FC = () => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const limit=50;
  const [offset,setOffset]=useState(0);
  const [next,setNext]=useState(0);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/emojis?limit=${limit}&offset=${offset}`);
        const data = await res.json();
        setNext(data.length);
        setEmojis(data);
      } catch (error) {
        console.error('Error fetching emojis:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchEmojis();
  }, [offset,limit]);



  if (loading) return <SkeletonLoader count={40} style=' bg-white/10 h-20 w-40 backdrop-blur-md border border-white/20 p-4 rounded-full shadow-md'/>;

  return (
  <>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
        {
          emojis ?
          emojis.map((emoji,index)=>(
            <EmojiCard key={index} emojiType={emoji}/>
          )) :
          <span>Failed to fetch emoji due to low internet speed.</span>
        }
    </div>
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={() => setOffset(prev => Math.max(prev - limit, 0))}
        disabled={offset === 0}
        className="cursor-pointer px-4 py-2 text-amber-300 bg-black rounded disabled:opacity-50"
      >
        Previous
      </button>
        <button
          onClick={() => setOffset(prev => prev + limit)}
          disabled={next<50}
          className={` px-4 py-2 bg-amber-300 text-black font-bold rounded ${next<50?"cursor-not-allowed":"cursor-pointer"} disabled:opacity-50`}  
        >
          Next
        </button>
</div>

  </>
  );
};

export default EmojiList;
