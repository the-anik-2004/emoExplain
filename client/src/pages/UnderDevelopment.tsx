import React from 'react'

const UnderDevelopment: React.FC<{ feature: string }> = ({ feature }) => {
  return (
    <>
      <h1 className="font-extrabold  text-4xl sm:text-6xl text-center mt-4">😉emoExplain</h1>
      <div className="h-[80%] w-full flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-white/80 mb-4">
        🚧 {feature} Page Under Development
      </h1>
        <div className='h-10 aspect-square bg-conic from-amber-400 via-amber-600 to-amber-800 my-2 rounded-full animate-spin'></div>
      <p className="text-white/60 text-lg sm:text-xl max-w-lg">
        We're working on bringing the <span className="text-yellow-400">{feature}</span> feature to life.
        Stay tuned — it'll arrive in <span className="text-emerald-400">Version 2</span>!
      </p>
    </div>
    </>
  )
}

export default UnderDevelopment;
