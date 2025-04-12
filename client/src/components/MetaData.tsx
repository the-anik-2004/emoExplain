import React from 'react'

interface MetaDataProps{
    label:string|string[];
    value:string|string[]|number;
}

const MetaData:React.FC<MetaDataProps> = ({label,value}) => {
    const displayCondition=Array.isArray(value) && value.length===0
    const displayValue=Array.isArray(value)?value.join(", "):value;
  return (
    <div className={`flex flex-row justify-center items-center w-full sm:w-fit gap-2 border-1 border-white py-1 px-3 rounded-md bg-white/60 text-black hover:bg-zinc-900/10 hover:text-white cursor-grab ${displayCondition?"hidden":"" }`}>
        <h4 className='text-md sm:text-lg font-bold capitalize'>{label}:</h4>
        <p className={`text-md sm:text-lg font-semibold capitalize `} > {displayValue}</p>
    </div>
  )
}

export default MetaData;
