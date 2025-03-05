import React, { useContext, useState } from 'react'
import Game from './Game';
import Button from '../Components/Button';
import { SocketContext, SocketProvider } from '../Context/SocketContext';

function Head() {
    const [sideView,setSideView]=useState(false);
  const features=[["Play Online","bots","Tournaments","History"],["News","Articles"]];
  const mainFeatures=["Play","News"];
  const [index,setIndex]=useState(-1);
  const {socket,user}=useContext(SocketContext);
  console.log(socket,user);
  const handleToggle=(index:number)=>{
        setSideView(true);
        setIndex(index);
  }
  const[context,setContext]=useState("");
  return (
    <div className='flex justify-start items-center border border-blue-500 relative h-full  w-full'>
         <input type="checkbox" className='hidden peer' id="dropdown" />
         <label htmlFor="dropdown" className='absolute top-2 left-2 z-53 md:hidden'>
          <img src="./dropdown.png" alt="" className='h-4 w-4 focus:scale-90 transition-all duration-150'/>
         </label>
          <div className="md:flex flex-col space-y-2 items-center bg-black/30 justify-between  py-4 md:py-0 md:w-1/5 w-1/2 max-w-[400px] hidden peer-checked:flex md:translate-x-0 -translate-x-10 peer-checked:translate-x-0 h-full z-1">
            <div className="flex flex-col py-2 items-center w-full text">
         {mainFeatures.map((item,index)=>{
            return <div className="flex justify-start items-center cursor-pointer  w-full space-x-2 hover:bg-black/40  "  key={index} onMouseEnter={()=>handleToggle(index)}>
                <img src={`./${item.toLowerCase()}.png`} alt="" className='object-scale-down md:w-12 md:h-12 h-6 w-6  ' />
          <h1 className=' text-white font-bold'>{item}</h1>
         </div>
         })}
           </div>
         <div className="bottomFeatures flex flex-col space-y-2 items-start w-full p-2">
          <div className="flex flex-col space-y-2 items-start w-full text">
            <div className="flex items-center space-x-2 cursor-pointer hover:scale-110 transition duration-300">
               <img src={`./profile.png`} alt="" className='object-scale-down md:w-8 md:h-8  w-4 h-4' />
               <h1 className=' text-white font-normal text'>Profile</h1>
            </div>
          <div className="flex items-center space-x-2 cursor-pointer hover:scale-110 transition duration-300">
               <img src={`./logout.png`} alt="" className='object-scale-down w-8 h-8 ' />
               <h1 className='text text-white font-normal'>LogOut</h1>
          </div>
          </div>
          <Button text="Sign Up" width='w-full' />

         </div>
        </div> 
     {sideView&& <div className="bg-black/50  space-y-2 flex flex-col items-start md:w-1/5 w-2/6 p-2 z-1 h-full" onMouseLeave={()=>{
                setSideView(false);
                setIndex(-1);
            }}>
        {features[index].map((item,index)=>{
            return <div className="flex justify-start items-center cursor-pointer hover:bg-black/60 w-full space-x-2 text "  key={index} onClick={()=>{setContext(item)}}>
            <img src={`./${item.toLowerCase()}.png`} alt="" className='object-scale-down md:w-12 md:h-12 w-6 h-6  ' />
      <p className='text-white font-normal'>{item}</p>
     </div>
        })}


      </div>
      }
    {context.toLowerCase()==="play online"&&
      <Game/>
    
    }
    </div>
  )
}

export default Head