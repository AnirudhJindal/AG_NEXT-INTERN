import React, { type ReactElement } from 'react'

interface buttonIntfc {
    varient : "primary" | "secondary",
    text : string,
    startIcon? : ReactElement,
    endIcon? : ReactElement,
    onclick? : ()=> void,
    fullWidth? : boolean,
    loading? : boolean
  }
const defaultStyles= " w-40 rounded-lg h-10 text-tiny font-medium "


  const varienClasses = {
  "primary"  : "bg-[#5246e7] text-white" ,
  "secondary": "bg-[#e0e7fe] text-[#6465a5]"
  }
  
  export const ButtonComponent = (props : buttonIntfc) => {
    return (
      <button className = {varienClasses[props.varient]  +  `${defaultStyles}`}>
        <div className='flex justify-around '>
          <div className='pl-2.5 py-0.5 pb-1.5'>{props.startIcon}</div>
          <div className='pl-0.5 pr-3.5 py-0.5 pb-1.5'>{props.text}</div>
        </div>
        
      </button>
    )
  }
  