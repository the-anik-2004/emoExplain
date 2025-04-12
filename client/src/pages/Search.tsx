import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '../../public/icons'
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';

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

const Search = () => {
  const [allEmoji,setAllEmoji]=useState<Emoji[]>([]);
  const [recentEmojiSearches, setRecentEmojiSearches] = useState<string[]>([]);
  const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [queryValue,setQueryValue]=useState<string>('')
  
  useEffect(()=>{
    const fetchAllEmoji=async()=>{
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emojis/all`);
        const data=await res.json();
        setAllEmoji(data)
      } catch (error) {
        console.log("error while fetching all emojis");
      }finally{
        setLoading(false);
      }
    }
    fetchAllEmoji();
  },[]);

  useEffect(()=>{
    const storedSearches=localStorage.getItem('recentEmojiSearches');
    if(storedSearches  ){
      setRecentEmojiSearches(JSON.parse(storedSearches));
    }
  },[])


  
  const handleSearch=(query:string):void=>{
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

      const result=allEmoji.filter((emoji)=>
        emoji.annotation.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        emoji.group.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        emoji.subgroup.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        emoji.tags.some(tag=>tag.toLocaleLowerCase().includes(query.toLocaleLowerCase())) ||
        emoji.emoji.includes(query) ||
        emoji.hexcode.includes(query)||
        emoji.order.toString().includes(query)
      )
      setQueryValue(query);
      setFilteredEmojis(result);
      setLoading(false);

      setRecentEmojiSearches((prev)=>{
        const updated=[query,...prev.filter(item=>item!==query)].slice(0,10)
        localStorage.setItem('recentEmojiSearches',JSON.stringify(updated));
        return updated;
      })
     
  }

  const handleClear=()=>{
    setQueryValue('');
    setFilteredEmojis([]);
   
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const groupEmojiByGroup=(emojis:Emoji[])=>{
      return emojis.reduce((acc:Record<string,Emoji[]>,emoji)=>{
        if(!acc[emoji.group]){
          acc[emoji.group]=[];
        }
        acc[emoji.group].push(emoji);
        return acc;
      },{})
  }
  const formatText=(text:string):string=>{
    return  text.split("-").join(" & ");
  }


  const groupedEmojis=groupEmojiByGroup(allEmoji);

  return (
    <div className='pt-4 flex flex-col items-center  '>
    <div className="pt-4 flex flex-col items-center w-full  " > 
    <h1 className="font-extrabold  text-3xl sm:text-5xl mb-4 ">😉emoExplain</h1>
    <SearchBar onSearch={handleSearch} onClear={handleClear}/>
    </div>
    <section className="flex flex-col-reverse sm:flex-row sm:justify-evenly p-4 gap-4 w-full overflow-hidden h-[75vh]">
        {/* left-top */}
        <div className="flex flex-col flex-2 border-2 border-gray-400 rounded-2xl p-4 sm:p-8 h-full overflow-y-auto hide-scrollbar ">
         {
          filteredEmojis.length!==0 && queryValue.trim()!==''  ? (
            //Search Result
          <div className='overflow-y-scroll h-full'>
            <h1 className="flex flex-start font-extrabold  text-2xl sm:text-4xl mb-4 text-emerald-400 border-b border-emerald-300 pb-2 sm:pb-4 items-center gap-2">
            <FontAwesomeIcon icon={['fas','wand-magic-sparkles']} className='text-lg sm:text-2xl'/>Search Result for <span className=' bg-zinc-900/50 px-4 py-1 border rounded-2xl capitalize'> {`${queryValue}`}</span> 
            </h1>
            <div className='flex flex-wrap gap-2 justify-center '>
              {
                !loading ? (filteredEmojis.map((emoji,index)=>(
                  <Link  
                  key={index} 
                  to={`/emoji/${emoji.hexcode}`} 
                  state={{emoji:emoji}}
                  className={`${index<3?"sm:w-[30%] text-4xl lg:text-9xl flex justify-center items-center p-4 rounded-4xl bg-gray-700/50 backdrop-blur-xs ":"text-2,5xl sm:text-6xl bg-zinc-900/50 backdrop-blur-xs p-4 rounded-2xl"} border cursor-pointer`} 
                  >{emoji.emoji}</Link>
                ))):(
                  <SkeletonLoader style="sm:w-[30%] text-4xl lg:text-9xl flex justify-center items-center p-4 rounded-4xl bg-gray-700/50 backdrop-blur-xs "/>
                )
              }
            </div>
            
          </div>):(
            // Other Emojis
            <div>
              {
                loading ? (
                  <SkeletonLoader count={30} style="p-2 h-10 aspect-square rounded-xl bg-zinc-900/50 border"/>
                ):
                Object.entries(groupedEmojis).map(([group,emojis])=>(
                  <div key={group} className='mb-8'>
                      <h1 className="text-2xl sm:text-4xl font-bold mb-2 border-b pb-1 text-emerald-400 capitalize rounded-md bg-gradient-to-t from-zinc-900/80 to-transparent  pl-4">{formatText(group)}</h1>
                      <div className='flex flex-wrap justify-center gap-2'>
                          {
                            emojis.map((emoji,index)=>(
                              <Link
                                key={index}
                                to={`/emoji/${emoji.hexcode}`}
                                state={{ emoji }}
                                 className="text-xl p-2 rounded-xl bg-zinc-900/50 border cursor-pointer"
                                >
                                  {emoji.emoji}
                                </Link>
                            ))
                          }
                      </div>
                  </div>
                ))
              }
            </div>
          )
         } 
         
        </div>

        {/* right-bottom */}
        <div className="flex flex-col flex-1 border-2 border-gray-400 rounded-2xl p-4 sm:p-8 h-full overflow-y-auto">
          <h1 className="flex flex-start font-extrabold  text-2xl sm:text-4xl mb-4 text-amber-400 border-b border-amber-300 pb-2 sm:pb-4  items-center gap-2 rounded-md bg-gradient-to-t from-zinc-900/80 to-transparent p-4 ">
            <FontAwesomeIcon icon={['fas','history']} className='text-lg sm:text-2xl'/> Recent Searches
          </h1>
          <div className='flex flex-wrap gap-4'>
            {
            recentEmojiSearches.length===0 ?
            (
              <p className='text-lg italic text-gray-400'>No recent searches</p>
            ):(
              recentEmojiSearches.map((searchItem,index)=>(
                  <span
                  key={index}
                  className=' cursor-pointer hover:underline text-amber-200 bg-gray-300/30 px-4 py-2 rounded-full hover:bg-zinc-900/50 border'
                  onClick={()=>handleSearch(searchItem)}
                  >{searchItem}</span>
              ))
            )
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Search
