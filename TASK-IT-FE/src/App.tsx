import {ButtonComponent,} from "./components/Button"
import { CardsComponent } from "./components/cards"
import { PlusIcon } from "./icons/Plus"
import { ShareIcon } from "./icons/Share"
import { Sidebar } from "./components/sidebar"
function App() {
  return(
   <>
  <div className="flex h-screen">
    {/* Sidebar - Left */}
    <div className="flex-shrink-0">
      <Sidebar/>
    </div>
    
    {/* Main Content Area */}
    <div className="flex-1 flex flex-col">
      {/* Top Right Buttons */}
      <div className="flex justify-end gap-3 m-4">
        <ButtonComponent 
          varient={"primary"} 
          text={"Add Content"} 
          startIcon={<PlusIcon size={"md"} color={"white"}/>}
        />
        <ButtonComponent 
          varient={"secondary"} 
          text={"Share Brain"} 
          startIcon={<ShareIcon size={"md"} color={"#8c84e4"}/>}
        />
      </div>
      
      {/* Cards - Center */}
      <div className="flex-1 flex  justify-center gap-4">
        <CardsComponent 
          title={"kalle kale de a dub vich 2-2 "} 
          messageType={"twitter"} 
          link={"https://x.com/DudespostingWs/status/1946366880777941090"}
        />
        <CardsComponent 
          title={"kalle kale de a dub vich 2-2 "} 
          messageType={"twitter"} 
          link={"https://x.com/DudespostingWs/status/1946366880777941090"}
        />
      </div>
    </div>
  </div>
</>)}
export default App
