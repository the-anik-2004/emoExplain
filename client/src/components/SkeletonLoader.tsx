// src/components/SkeletonLoader.tsx

interface SkeletonProps {
    count?: number;
    style?: string;
  }
  
  const SkeletonLoader = ({ count = 6, style = "w-16 h-16 sm:w-24 sm:h-24 bg-zinc-800 animate-pulse rounded-2xl border border-zinc-700" }: SkeletonProps) => {
    return (
      <div className="flex flex-wrap gap-2 justify-center mt-8">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={style+" animate-pulse"}
          />
        ))}
      </div>
    );
  };
  
  export default SkeletonLoader;
  
