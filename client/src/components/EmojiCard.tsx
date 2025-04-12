// EmojiCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Emoji {
  emojiType:{
    emoji: string;
    annotation: string;
    group: string;
    hexcode:string;
  }
}

const EmojiCard: React.FC<Emoji> = ({ emojiType }) => {


  return (
    <Link to={`/emoji/${emojiType.hexcode}`} state={{ emoji: emojiType }}>

    <div
      className="cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-all text-center text-white"
      >
     
      <div className="text-4xl mb-2">{emojiType.emoji}</div>
      <div className="text-sm font-semibold ">{emojiType.annotation.charAt(0).toUpperCase()+emojiType.annotation.substring(1)}</div>
    </div>
    </Link>
  );
};

export default EmojiCard;
