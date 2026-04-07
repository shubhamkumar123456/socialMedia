import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../../store/AuthSlice";
import URL from "../../getUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Friends = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setuser] = useState(location.state);
 

  const userDetail = useSelector((state) => state.auth.user);
  console.log(userDetail)
  console.log(user)
  const [posts, setPosts] = useState([]);


  // ✅ Fetch posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      let res = await fetch(
        `${URL}/api/posts/getsinglePost/${user._id}`
      );
      let data = await res.json();
      setPosts(data);
    };
    fetchUserPosts();
  }, [user._id]);


  

  // ✅ Follow
  const handleFollow = async () => {
    let res =await fetch(`${URL}/api/users/follow/${user._id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userId: userDetail._id }),
    });
    let data = await res.json();
// console.log(data)
setuser(data.friend)
    dispatch(updateUser(data.user));
  };



  return (
    <div className="bg-[#18191a] text-white min-h-screen">

      {/* COVER SECTION */}
      <div className="relative">
        <img
          src={
            user.coverPicture ||
            "https://images.unsplash.com/photo-1503264116251-35a269479413"
          }
          className="w-full h-[250px] object-cover"
        />

        {/* PROFILE PIC */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[150px]">
          <img
            src={
              user.profilePicture ||
              "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            }
            className="w-36 h-36 rounded-full border-4 border-black object-cover"
          />
        </div>
      </div>

      {/* USER INFO */}
      <div className="flex flex-col items-center mt-20">
        <h2 className="text-2xl font-bold capitalize">{user.name}</h2>

        <div className="flex gap-6 mt-2 text-gray-400">
          <p>{user.followers?.length || 0} Followers</p>
          <p>{user.followings?.length || 0} Following</p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-4">
          {userDetail ?.followings?.includes(user._id) ? (
            <button
              onClick={handleFollow}
              className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Follow
            </button>
          )}

          <Link
            to={"/chat"}
            state={{ user, userDetail }}
            className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Message
          </Link>
        </div>
      </div>

      {/* POSTS SECTION */}
      <div className="max-w-5xl mx-auto mt-8 px-4">

        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
          Posts
        </h3>

        {posts.length === 0 ? (
          <p className="text-center text-gray-400">
            No posts to show
          </p>
        ) : (
          
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {posts.map((post) => (
    <div
      key={post._id}
      className="bg-[#242526] rounded-lg overflow-hidden shadow"
    >

      {/* 🔥 SLIDER FOR MULTIPLE MEDIA */}
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="bg-black"
      >
        {post.media.map((file, i) => {
          const url = `${URL}/uploads/${file}`;
          const isVideo = /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(file);

          return (
            <SwiperSlide key={i}>
              {isVideo ? (
                <video
                  src={url}
                  controls
                  className="w-full h-48 object-cover object-center"
                />
              ) : (
                <img
                  src={url}
                  className="w-full h-48 object-contain"
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* POST INFO */}
      <div className="p-3">
        <p className="text-sm">{post.desc}</p>

        <div className="flex justify-between mt-2 text-gray-400 text-sm">
          <span>❤️ {post.likes?.length || 0}</span>
          <span>💬 {post.comments?.length || 0}</span>
        </div>
      </div>
    </div>
  ))}
</div>
        )}
      </div>
    </div>
  );
};

export default Friends;