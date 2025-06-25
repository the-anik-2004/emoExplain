import  { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '../../public/icons';
import MetaData from '../components/MetaData';
import FavoriteButton from '../components/FavoriteButton';
import { useAuth } from '../context/AuthContext';
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

const EmojiDetail = () => {
  // const { state } = useLocation();
  const {hexcode}=useParams();
  const {user}=useAuth()
  const [emoji,setEmoji]=useState<Emoji|null>(null);
  const [copied, setCopied] = useState(false);
  const [relatedEmojis, setRelatedEmojis] = useState<Emoji[]>([]);
  const [loadingRelated,setLoadingRelated]=useState<boolean>(false);
  

  useEffect(()=>{
    const fetchEmoji=async ()=>{
      try {
        const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emojis/${hexcode}`);
        if(!res.ok) throw new Error('Emoji not found');
        const data=await res.json();
        setEmoji(data);
      } catch (error) {
        console.error(error);
        setEmoji(null);
      }
    };

    if(hexcode){
      fetchEmoji();
    }
  },[hexcode]);


  useEffect(() => {
    setCopied(false);
  }, [hexcode]);

  useEffect(()=>{
    const fetchRelated =async()=>{
      if(!emoji)return;
      setLoadingRelated(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emojis/all`);
        const data = await res.json();
        const filtered = data.filter((e: Emoji) => e.group === emoji.group && e.hexcode !== emoji.hexcode);
        setRelatedEmojis(filtered);
      } catch (error) {
        console.error('Error fetching related emojis:', error);
      }finally{
        setLoadingRelated(false);
      }
    }
        fetchRelated();
  },[emoji])
  

  //Copy button
  const handleCopy = async () => {
    try {
      if (emoji) {
        await navigator.clipboard.writeText(emoji.emoji);
        setCopied(true);
      }
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  if (!emoji) return <p className="text-white text-center">Emoji not found</p>;

  //generate Emoji description
  const generateEmojiDescription = (emoji: Emoji) => {
    const tags = emoji.tags?.length ? emoji.tags.join(', ') : 'no specific';
    const emoticons = Array.isArray(emoji.emoticons) ?emoji.emoticons.join(', ') : null;
  
    return `The "${emoji.annotation}" emoji (${emoji.emoji}) belongs to the "${emoji.group}" group and "${emoji.subgroup}" subgroup. It's often used to express feelings like ${tags}.` +
      (emoticons ? ` It can also be written as ${emoticons}.` : '') +
      ` Introduced in Unicode ${emoji.unicode}.`;
  };
  
  console.log(relatedEmojis)
  return (
    <div className="pt-4 flex flex-col " > 
      <Link
        to="/"
        className="flex flex-row items-center text-2xl cursor-pointer border-b-2 px-4 pb-2"
      >
        <FontAwesomeIcon icon={['fas', 'arrow-left']} /> &nbsp; Back
      </Link>

      <section className="flex flex-col sm:flex-row sm:justify-evenly p-4 gap-4 ">
        {/* left-top */}
        <div className="flex flex-col items-center flex-1 border-2 border-gray-400 rounded-2xl p-4 sm:p-8 ">
          <div className="flex flex-col items-center border-b w-full border-b-amber-50 pb-4">
            <span className="text-6xl sm:text-8xl">{emoji.emoji}</span>
            <h1 className="text-2xl sm:text-4xl">
              {emoji.order + ' : ' + emoji.annotation.charAt(0).toUpperCase() + emoji.annotation.substring(1)}
            </h1>
          </div>

          {/* Buttons */}
          <div className='flex  justify-evenly w-full gap-2 '>
          <button
            onClick={handleCopy}
            className="text-xl w-full font-semibold my-4 bg-amber-300 text-black hover:bg-black/10 hover:backdrop-blur-sm border hover:text-white px-4 py-2 rounded-md cursor-pointer"
          >
            <FontAwesomeIcon icon={['fas', 'copy']} />
            {copied ? ' Emoji Copied' : ' Copy Emoji'}
          </button>

          <FavoriteButton hexcode={emoji.hexcode} favorites={user?.favorites} />

          </div>
        

         

          <div className="flex flex-row justify-center flex-wrap border-t w-full border-amber-50 border-b py-4 gap-2">
            <MetaData label="Emoji No" value={emoji.order.toString()} />
            <MetaData label="genre" value={emoji.group} />
            <MetaData label="hexcode" value={emoji.hexcode} />
            <MetaData label="unicode" value={emoji.unicode.toString()} />
            <MetaData label="group" value={emoji.group} />
            <MetaData label="subgroup" value={emoji.subgroup} />
            <MetaData label="tags" value={emoji.tags} />
            <MetaData label="emoticons" value={emoji.emoticons} />
          </div>
          <div className="mt-6 w-full bg-white/10 backdrop-blur-md rounded-xl p-4 border border-gray-300 shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-white">Description</h2>
              <p className="text-white text-md">{generateEmojiDescription(emoji)}</p>
        </div>
        
        </div>

        {/* right-bottom */}
        {
        <div className="flex flex-col flex-1 border-2 border-gray-400 rounded-2xl p-4 sm:p-8">
          <h1 className='text-2xl border-b border-white pb-4 mb-4'>Realated Emojis</h1>
        <div className="flex flex-wrap gap-1">
           {
              relatedEmojis.map((rEmo, index) => (
                <Link
                  key={index}
                  className="text-4xl cursor-pointer"
                  to={`/emoji/${rEmo.hexcode}`}
                >
                  {rEmo.emoji}
                </Link>
              ))
            }
          </div>
        </div>
        }
      </section>
    </div>
  );
};

export default EmojiDetail;
