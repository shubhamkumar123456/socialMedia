import React, { useEffect, useRef, useState } from 'react'
import FriendList from '../../components/FriendList'
import './home.css'
import { useSelector } from 'react-redux'
import PostCreate from '../../components/PostCreate'
import URL from '../../getUrl'
import PostCard from '../../components/PostCard'
const Home = () => {

    const [allPosts, setAllPosts] = useState([]);
    console.log(URL)
  

 
  const getUser = useSelector((state) => state.auth)
  // console.log(getUser.user._id)


 


  const getPosts = async () => {
    try {
      let res = await fetch(URL + "/api/posts/allPost", {
      method: "GET",
      headers:{'content-type':'application/json'},
      credentials: "include",
    });
    let ans = await res.json();
    console.log(ans)
    setAllPosts(ans);

    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(()=>{
    getPosts()
  },[])
  return (
    <div className="min-h-screen bg-[#18191a] text-white flex justify-center">

  {/* MAIN WRAPPER */}
  <div className="w-full max-w-6xl flex gap-6 px-3 mt-4">

    {/* LEFT / FRIEND LIST */}
    <div className="hidden md:block  w-1/4">
      <div className="sticky top-20  ">
        <FriendList />
      </div>
    </div>

    {/* CENTER FEED */}
    <div className="flex-1 flex flex-col items-center">
      <div className="w-full max-w-xl space-y-4">
        <PostCreate getPosts={getPosts} />

        <PostCard allPosts={allPosts} setAllPosts={setAllPosts} getPosts={getPosts} />
     
      </div>
    </div>

    {/* RIGHT SIDE (optional future) */}
    <div className="hidden lg:block w-1/4">
      {/* you can add suggestions / ads */}
    </div>

    
  </div>  
  
</div>
  )
}

export default Home
