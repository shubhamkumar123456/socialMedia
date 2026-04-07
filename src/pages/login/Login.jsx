import React, { memo, useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AuthSlice, { loginUser } from '../../store/AuthSlice'
import URL from '../../getUrl'

const Login = () => {

  console.log(URL)
  const [errMsg, seterrMsg] = useState("");

  const dispatch = useDispatch()
  let emailRef = useRef();
  let passwordRef = useRef();
 

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch(URL+'/api/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      })
      let data = await response.json();
      // console.log(data);
      if (response.ok) {
        dispatch(loginUser())
      }
      else{
        seterrMsg(data.msg)
        // console.log(data)
        setTimeout(()=>{
          seterrMsg("")
        },2000)
      }
    } catch (error) {
      seterrMsg(error.msg)
      // console.log(error)

    }
  }
  return (
  <div className="min-h-[calc(100vh-65px)] bg-black flex items-center justify-center px-4">

    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-10">

      {/* LEFT SECTION */}
      <div className="text-center md:text-left">
        <h1 className="text-blue-500 text-5xl font-bold mb-3">
          facebook
        </h1>
        <p className="text-gray-300 text-xl max-w-md">
          Connect with friends and the world around you on Facebook.
        </p>
      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="bg-[#18191a] p-6 rounded-lg shadow-lg w-full max-w-sm">

        {errMsg && (
          <p className="text-red-500 text-center mb-3">{errMsg}</p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-3">

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

          <button
            type="submit"
            onClick={handleLogin}
            className="bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition active:scale-95"
          >
            Log In
          </button>

          <p className="text-center text-blue-400 text-sm cursor-pointer hover:underline">
            Forgotten password?
          </p>

          <hr className="border-gray-600" />

          <Link
            to="/signup"
            className="bg-green-500 text-white text-center py-2 rounded-md font-semibold hover:bg-green-600 transition"
          >
            Create New Account
          </Link>
        </form>
      </div>
    </div>
  </div>
);
}

export default memo(Login)
