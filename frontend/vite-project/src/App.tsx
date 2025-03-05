import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/LandingPage'
import Game from './Pages/Game'
import SignUp from './Components/SignUp'
import Head from './Pages/Head'
import { useEffect, useState } from 'react'
import { SocketContext, SocketProvider } from './Context/SocketContext.tsx'

function App() {
  return (
    
      <BrowserRouter>
        <div className="max-w-[1500px] mx-auto w-screen overflow-hidden bg-[url('./chessGame.webp')] bg-cover bg-no-repeat h-screen max-h-[1000px]">
        <SocketProvider> 
          <Routes>
            <Route path='/head' element={<Head/>}/>
            <Route path="/:action" element={<SignUp />} />
          </Routes>
          </SocketProvider>
        </div>
      </BrowserRouter>
    
  );
}


export default App
