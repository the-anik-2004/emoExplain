// src/components/SkeletonLoader.tsx

interface SkeletonProps {
    count?: number;
    style?: string;
  }
  
  const SkeletonLoader = ({ count = 6, style = "w-16 h-16 sm:w-24 sm:h-24 bg-zinc-800 animate-pulse rounded-2xl border border-zinc-700" }: SkeletonProps) => {
    return (
      <div className="flex flex-row flex-wrap gap-2 justify-center items-center mt-8">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={style+" animate-pulse"}
          > 
          <div className='h-4 aspect-square mx-auto bg-conic from-amber-400 via-amber-600 to-amber-800 my-2 rounded-full animate-spin'></div>
            </div>
        ))}
      </div>
    );
  };
  
  export default SkeletonLoader;
  
