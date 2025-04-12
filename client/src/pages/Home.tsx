import { useNavigate } from "react-router-dom"
import EmojiList from "../components/EmojiList";

const Home = () => {
  const navigate=useNavigate();
  return (
    <div className="flex flex-col items-center p-2 ">
     <header className="flex flex-col items-center justify-center mt-2 mb-4 select-none">
        <h1 className="font-extrabold  text-4xl sm:text-6xl ">😉emoExplain</h1>
        <p className=" sm:mt-2 sm:text-2xl text-amber-300">Understand the meaning behind every emoji</p>  
     </header>
     <button
      onClick={()=>navigate("/search")}
      className="border border-white px-4 py-2 rounded-lg font-bold bg-amber-300 text-black hover:bg-transparent hover:text-white hover:drop-shadow-[0_0_10px_white] transition-all sm:duration-400 cursor-pointer"
      >
         Start Searching
      </button>
      <EmojiList/>
    
    </div>
  )
}

export default Home
