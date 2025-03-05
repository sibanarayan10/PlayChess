import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../style.css'

function Navbar() {
    const pages = ["ContactUs", "About"];
    const navigate = useNavigate();
    return (
        <div className='flex justify-center max-w-screen-2xl  space-x-2'>
            <div className='fixed flex justify-between space-x-2 w-full max-w-[1500px] item-center bg-[#D9D9D9] shadow-inner shadow-gray-800 p-2 '>
            <button className="home flex justify-center item-center mx-4 cursor-pointer" onClick={()=>navigate('home')}>
                <h1 className='lg:text-5xl text-4xl  font-bold text-black m-2' style={{
                    "fontFamily": "Playwrite CU serif",
                    "fontWeight": "400",
                    "fontStyle": "normal"
                }}>Home</h1>
            </button>
            <div className="rest flex justify-center item-center ">
                {pages.map((page, index) => <h1 key={index} className='text-navbar text-black m-4 hover:underline cursor-pointer' style={{
                    "fontFamily": "Playwrite CU serif",
                    "fontWeight": "100",
                    "fontStyle": "normal"
                }} onClick={() => navigate(page.toLowerCase())}> {page}</h1>)}
            </div>
            </div>
        </div>
    )
}

export default Navbar