import  { ReactNode, useContext, useEffect, useState } from 'react'
import { SocketContext } from '../Context/SocketContext';
import { useParams } from 'react-router-dom';

function SignUp() {
  const inputs=["username","email","password"];
  const {socket,setUrl,setUser,user}=useContext(SocketContext);
  const[values,setValues]=useState({username:"",email:"",password:""})
  console.log(socket)
  console.log(user);
  const {action}=useParams();

  
const handleSubmit=(e:any)=>{
  e.preventDefault();

   if(action==="sign"){
    socket?.send(JSON.stringify({
    type:"register",
    payload:values,
    user:{user}
  }));
   }
    else if(action=="login"){
      socket?.send(JSON.stringify({
        type:"login",
        payload:{
          email:values.email,
          password:values.password,
          
        },
        user:{user}
      }))
    }
}
const validateInputs=(name: string)=>{
if(name==="email"){
  if(!values.email){
     return "Required!"
  }
  else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
      return "Invalid email address"
  }

}
if(name==="password"){
  if(!values.password){
    return "Required!"
    }
  else if(values.password.length<8){
      return "Password should be at least 8 characters"
    }

}

}

useEffect(()=>{
  if(!socket){
    return;
  }
  socket.onmessage=(event)=>{
      const data=JSON.parse(event.data);
      if(data.type=="login"){
          console.log(data.payload);
          const {token}=data.payload;
          setUrl(`ws://localhost:8081?token=${token}`)
          setUser(true);
       }
       
  }
  console.log(socket);
},[values.email])

  return (
    <div className='max-w-full flex items-center justify-center h-full max-h-[900px] bg-black/30 z-[1000]'> 
        <form action="" onSubmit={handleSubmit} className='flex flex-col space-y-2 items-center border rounded-lg md:w-2/5 w-4/5 p-4 bg-black/70'>
          <label htmlFor="" className=' text-white font-bold heading'>Create An Account</label>
              {inputs.map((item,index)=>{
                if(action=="login"&&item==="username"){
                  return;
                }
                return <div className='flex flex-col space-y-1 items-start w-full text' key={index}>
                  <label htmlFor={item} className='text-white capitalize'>{item}</label>
                  <input type="text" name={item} value={values[item]} onChange={(e)=>{validateInputs(e.target.name)
                    setValues((prev)=>({...prev,[item]:e.target.value}))}} className='rounded-xl w-full p-2 hover:outline-none text-white bg-gray-500'/>
                  <p className='text-red-500 text-xs italic'>{validateInputs(item)}</p>
                </div>
              })}
              <button type="submit" className='rounded-full text-white font-semibold text-base shadow-inner  bg-blue-500 hover:bg-blue-600 font-thin transition-all duration-150 p-2 px-6 capitalize '>{action}</button>
        </form>
    </div>
  )
}

export default SignUp