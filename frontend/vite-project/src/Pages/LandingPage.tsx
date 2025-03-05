import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import '../style.css'
import Navbar from '../Components/Navbar';

function LandingPage(){
  const navigate = useNavigate();

  const handlePlayWithHuman = () => {
    navigate('/game/human');
  }

  const handlePlayWithComputer = () => {
    navigate('/game/computer');
  }

  return (<>
  <Navbar/>
    <div className="main flex flex-col items-center justify-center w-full  h-screen md:m-0 mt-12 max-h-[850px] ">
    <div className="landingPage flex md:flex-row flex-col md:h-4/6 h-5/6  w-5/6 bg-slate-700 shadow drop-shadow-2xl shadow-gray-900 hover:shadow-lg rounded-lg space-x-2 bg-white/40">
       <div className="left md:w-3/6 w-full md:h-full h-1/2 md:order-none order-last flex items-center justify-center  relative ">
        <div className="imagecontainer md:h-full h-full w-5/6">
          <img
            src="chessboard.webp"
            className="rounded-lg -black overflow-hidden h-full w-full hover:scale-105 transition-transform duration-300 shadow-md object-cover"
            alt="Chessboard"
          />
        </div>
        <div className="absolute bottom-10 text-paragraph text-gray-800 bg-white rounded-lg px-3 py-2 shadow-lg shadow-inner shadow-gray-800">
          "Experience the ultimate chess game!"
        </div>
      </div>
      <div className="right md:order-none order-first md:w-3/6 w-full md:h-full h-1/2   flex justify-start items-center flex-col ">

        <div className="flex flex-col items-center w-5/6 text-center m-10 ">
          
            <p style={{
                      "fontFamily":"Playpen Sans serif",
                      "fontVariant":"normal",
                      "fontStyle":"normal"}} className='heading'>No #1 site for playing</p>
            <div className='lg:text-9xl text-6xl text-center' style={{ 
                                                          "fontFamily":"Playwrite CU serif",
                                                           "fontWeight":"400",
                                                           "fontStyle":"normal"}}>chess</div>
         
        </div>
        <div className="bottom flex item-center relative w-full  h-full ">
          <div className="buttonContainer flex flex-col m-2 space-y-2">
         <Button text="Play with Human" onClick={handlePlayWithHuman} width='w-3/5' type="button" />
         <Button text="Play with Computer" onClick={handlePlayWithComputer} width='w-3/5'  type="button" />
        </div>


          <div className="firstIcon absolute bottom-2 right-24 h-5/6 w-auto p-0">
            <img src="n.png" alt="" className='opacity-70  m-0 p-0 overflow-visible hover:rotate-12   transition-transform duration-300 h-full' />
          </div>
          <div className="secondIcon absolute bottom-0 right-0  w-auto rotate-12">
            <img src="p.png" className='opacity-60  object-scale-down m-0 p-0 overflow-visible h-full' alt="" />
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default LandingPage;
