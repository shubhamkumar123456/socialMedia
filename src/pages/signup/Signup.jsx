import React, { useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import URL from '../../getUrl';
const Signup = () => {
  
  const [errmsg, setErrMsg] = useState("");
  let nameRef = useRef()
  let emailRef = useRef()
  let passwordRef = useRef()
  let cpasswordRef = useRef()
 
  const navigate = useNavigate()

const handleSignup =async(e)=>{
  e.preventDefault()
 
try {
  let response = await fetch(URL+'/api/users/create',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
     },
    body:JSON.stringify(  {
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      cpassword:cpasswordRef.current.value,
     })
    
 })
 const json = await response.json();
console.log(json);
setErrMsg(json.message)
setTimeout(() => {
  setErrMsg("")
}, 5000);
if(response.ok){
  navigate('/login')
}
} catch (error) {
  console.log(error.message)
  setErrMsg(error.message)
  setTimeout(() => {
    setErrMsg("")
  }, 5000);
}
}
 return (
  <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4">

    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-10">

      {/* LEFT */}
      <div className="text-center md:text-left">
        <h1 className="text-blue-500 text-5xl font-bold mb-3">
          Social Media
        </h1>
        <p className="text-gray-300 text-xl max-w-md">
          Join Facebook and connect with friends around the world.
        </p>
      </div>

      {/* RIGHT CARD */}
      <div className="bg-[#18191a] p-6 rounded-lg shadow-lg w-full max-w-sm">

        {errmsg && (
          <p className="text-red-500 text-center mb-3">{errmsg}</p>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-3">

          <input
            type="text"
            ref={nameRef}
            placeholder="Full Name"
            className="bg-[#3a3b3c] text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            ref={emailRef}
            placeholder="Email address"
            className="bg-[#3a3b3c] text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="bg-[#3a3b3c] text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            ref={cpasswordRef}
            placeholder="Confirm Password"
            className="bg-[#3a3b3c] text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            onClick={handleSignup}
            className="bg-green-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-green-600 transition active:scale-95"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
);
}

export default Signup
