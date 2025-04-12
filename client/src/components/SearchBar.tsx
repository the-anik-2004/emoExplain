import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const SearchBar: React.FC<{ onSearch: (query: string) => void; onClear: () => void }> = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[80%] mt-4 flex items-center justify-center">
      <div className="flex w-full shadow-md">
        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search emojis..."
          className="flex-grow px-4 py-2 h-12 sm:h-15 rounded-l-full border border-gray-300/50 border-r-0 text-black bg-white/30 font-semibold focus:outline-none"
        />

        {/* Clear Button */}
        <button
          type="button"
          onClick={() => {
            setQuery('');
            onClear?.();
          }}
          className="px-4 py-2 h-12 sm:h-15 bg-white/30 font-semibold border-t border-b border-gray-300/50 text-black cursor-pointer hover:text-red-400"
        >
          <FontAwesomeIcon icon={['fas', 'xmark']} />
        </button>

        {/* Submit/Search Button */}
        <button
          type="submit"
          className="px-4 py-2 h-12 w-18 sm:h-15 rounded-r-full border border-gray-300/50 border-l-0 hover:text-amber-300 cursor-pointer text-2xl flex justify-center items-center bg-zinc-900/30   backdrop-blur-xs hover:shadow-inner"
        >
          <FontAwesomeIcon icon={['fas', 'search']} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
