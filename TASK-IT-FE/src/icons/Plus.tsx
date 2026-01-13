import React from "react"

import { type iconsInterface, sizeVarients } from "./iconsInterface"


export const PlusIcon = (props : iconsInterface) => {
  return (
    
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={props.color} className={sizeVarients[props.size]}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

  )
}
