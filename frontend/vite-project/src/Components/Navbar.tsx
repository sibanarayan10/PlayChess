import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const pages = ["ContactUs", "About"];
    const navigate = useNavigate();
    return (
        <div className='flex  bg-[#D9D9D9]  justify-between h-16 item-center flex-row shadow-inner shadow-gray-800 overflow-visible '>
            <div className="home flex justify-center item-center mx-4 cursor-pointer" onClick={()=>navigate('home')}>
                <h1 className='text-5xl font-bold text-black m-2' style={{
                    "fontFamily": "Playwrite CU serif",
                    "fontOpticalSizing": "auto",
                    "fontWeight": "400",
                    "fontStyle": "normal"
                }}>Home</h1>
            </div>
            <div className="rest flex justify-center item-center flex-row">
                {pages.map((page, index) => <h1 key={index} className='text-2xl text-black m-4 hover:underline cursor-pointer' style={{
                    "fontFamily": "Playwrite CU serif",
                    "fontOpticalSizing": "auto",
                    "fontWeight": "100",
                    "fontStyle": "normal"
                }} onClick={() => navigate(page.toLowerCase())}> {page}</h1>)}
            </div>
        </div>
    )
}

export default Navbar