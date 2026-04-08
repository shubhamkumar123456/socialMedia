import React, { useEffect, useRef, useState } from 'react'
import FriendList from '../../components/FriendList'
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
  <div className="min-h-screen w-full bg-[#18191a] text-white flex justify-center overflow-x-hidden">

    {/* MAIN WRAPPER: Responsive gap and padding */}
    <div className="w-full max-w-6xl flex gap-0 md:gap-6 px-2 md:px-3 mt-4">

      {/* LEFT SIDE: Hidden on mobile, 25% on desktop */}
      <div className="hidden md:block w-1/4">
        <div className="sticky top-20">
          <FriendList />
        </div>
      </div>

      {/* CENTER FEED: Takes full width on mobile */}
      <div className="flex-1 w-full flex flex-col items-center">
        {/* Container for feed items */}
        <div className="w-full max-w-xl space-y-4">
          <PostCreate getPosts={getPosts} />
          <PostCard 
            allPosts={allPosts} 
            setAllPosts={setAllPosts} 
            getPosts={getPosts} 
          />
        </div>
      </div>

      {/* RIGHT SIDE: Hidden until Large screens */}
      <div className="hidden lg:block w-1/4">
        {/* Placeholder for future features */}
      </div>

    </div>   
  </div>
)
}

export default Home
