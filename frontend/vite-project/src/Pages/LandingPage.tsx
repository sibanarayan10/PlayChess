import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

function LandingPage(){
  const navigate = useNavigate();

  const handlePlayWithHuman = () => {
    navigate('/game/human');
  }

  const handlePlayWithComputer = () => {
    navigate('/game/computer');
  }

  return ( 
    <div className="main flex flex-col items-center justify-center h-full bg-slate-400">
    <div className="landingPage flex h-5/6 w-5/6 bg-slate-700 shadow drop-shadow-2xl shadow-gray-900 hover:shadow-lg rounded-lg" style={{ backgroundColor: "#D9D9D9"}}>
       <div className="left w-3/6 h-full flex items-center justify-center border-black relative">
        <div className="imagecontainer flex justify-center items-center h-5/6 w-5/6 mx-5">
          <img
            src="chessboard.webp"
            className="rounded-lg border-black overflow-hidden h-full w-full hover:scale-105 transition-transform duration-300 shadow-md "
            alt="Chessboard"
          />
        </div>
        {/* Tooltip for the Image */}
        <div className="absolute bottom-10 text-sm text-gray-800 bg-white rounded-lg px-3 py-2 shadow-lg shadow-inner shadow-gray-800">
          "Experience the ultimate chess game!"
        </div>
      </div>
      <div className="right w-3/6 h-full flex justify-center flex-col">

        <div className="top text-2xl h-2/5 w-5/6 text-center m-10 flex">
          <div className="heading text-6xl text-center flex justify-center w-full items-center flex-col">
            <p style={{"fontFamily": "Playpen Sans serif",
                      "fontOpticalSizing": "auto",
                      "fontVariant": "normal",
                      "fontStyle": "normal"}}>No #1 site for playing </p>
            <div className='text-9xl text-center' style={{ "fontFamily": "Playwrite CU serif",
                                                           "fontOpticalSizing": "auto",
                                                           "fontWeight": "400",
                                                           "fontStyle": "normal"}}>chess</div>
          </div>
        </div>
        <div className="bottom flex item-center justify-center flex-col h-3/5 relative  ">
          <div className="buttonContainer flex flex-col  absolute w-full h-3/6 top-0 left-5">
         <Button text="Play with Human" onClick={handlePlayWithHuman} width='w-2/5' height='h-1/4' type="button" />
         <Button text="Play with Computer" onClick={handlePlayWithComputer} width='w-2/5' height='h-1/4' type="button" />
        </div>


          <div className="firstIcon absolute bottom-2 right-24 h-5/6 w-auto p-0">
            <img src="n.png" alt="" className='opacity-70 h-full m-0 p-0 overflow-visible hover:rotate-12   transition-transform duration-300' />
          </div>
          <div className="secondIcon absolute bottom-0 right-0 h-3/6 w-auto rotate-12">
            <img src="p.png" className='opacity-60  h-full m-0 p-0 overflow-visible h-full' alt="" />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LandingPage;
