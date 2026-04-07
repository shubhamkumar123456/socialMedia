import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaPaperPlane,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import URL from "../getUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { toast } from "react-toastify";
import { Button, Modal } from 'antd';
import { useSelector } from "react-redux";

const PostCard = (props) => {
  const {allPosts,setAllPosts,getPosts} = props

// Hooks -->  
  const Auth = useSelector((state)=>state.auth)
//   console.log(Auth)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [postComments, setpostComments] = useState([]);
  console.log(allPosts)
  
// functions -->
 const showModal = (comments) => {
    setpostComments(comments)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const getPosts = async () => {
  //   let res = await fetch(URL + "/api/posts/allPost", {
  //     method: "get",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //   });
  //   let ans = await res.json();
  //   setAllPosts(ans);
  // };

  
  const handlePostComment = async (postId, i) => {
    // console.log(inputValue);
    let res = await fetch(URL + `/api/posts/comment/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({text: inputValue }),
    });
    let ans = await res.json();
    console.log(ans);

    toast.success(ans.msg);
    let copyPosts = [...allPosts];
    copyPosts[i] = ans.post;
    setAllPosts(copyPosts);
  
    setInputValue('')
  };

  const handleLike = async(postId,i) => {
    let res = await fetch(URL + `/api/posts/like/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    let ans = await res.json();
    console.log(ans);

    toast.success(ans.msg);
    let copyPosts = [...allPosts];
    copyPosts[i] = {...ans.post,userId:{name:Auth.user.name, profilePicture:Auth.user.profilePicture}};
    console.log(copyPosts)
    
    setAllPosts(copyPosts);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="space-y-6">
      {allPosts?.map((ele,i) => {
        return (
          <div
            key={ele._id}
            className="w-full max-w-xl mx-auto bg-[#242526] text-white rounded-xl shadow-lg border border-gray-700"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <img
                  src={
                    ele?.userId?.profilePicture ||
                    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                  }
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-sm font-semibold capitalize">
                  {ele?.userId?.name}
                </p>
              </div>
              <BsThreeDots className="cursor-pointer text-lg hover:text-gray-400" />
            </div>

            {/* MEDIA SLIDER */}
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="bg-black"
            >
              {ele.media.map((file, index) => {
                const url = file;
                const isVideo =
                  /\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv|m4v|3gp)$/i.test(file);

                return (
                  <SwiperSlide key={file}>
                    {isVideo ? (
                      <video
                        src={url}
                        controls
                        className="w-full h-[400px] object-contain"
                      />
                    ) : (
                      <img
                        src={url}
                        className="w-full h-[400px] object-contain"
                      />
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* ACTION BUTTONS */}
            <div className="flex justify-between items-center px-4 py-3 text-xl">
              <div className="flex gap-5 items-center">
                <div className="flex items-center gap-1">
                  {ele?.likes?.includes(Auth.user._id) ? (
                    <FaHeart
                      onClick={()=>handleLike(ele._id,i)}
                      className="text-red-500 cursor-pointer hover:scale-110 transition"
                    />
                  ) : (
                    <FaRegHeart
                      onClick={()=>handleLike(ele._id,i)}
                      className="cursor-pointer hover:scale-110 transition"
                    />
                  )}
                  <span className="text-xs">{ele?.likes?.length}</span>
                </div>

                <div className="flex items-center gap-1">
                  <FaRegComment onClick={()=>showModal(ele.comments)} className="cursor-pointer hover:scale-110 transition" />
                  <span className="text-xs">{ele?.comments?.length}</span>
                </div>

                {/* <div className="flex items-center gap-1">
                  <FaPaperPlane className="cursor-pointer hover:scale-110 transition" />
                  <span className="text-xs">0</span>
                </div> */}
              </div>
            </div>

            {/* LIKES */}
            {/* <div className="px-4 text-sm font-semibold">
              {liked ? "1 like" : "0 likes"}
            </div> */}

            {/* CAPTION */}
            <div className="px-4 py-2 text-sm text-gray-300">
              <span className="font-semibold text-white mr-2">
                {ele?.userId?.name}
              </span>
              {ele.desc || "No caption"}
            </div>

            {/* COMMENT INPUT */}
            <div className="flex items-center border-t border-gray-700 px-3 py-2">
              <input
                type="text"
                value={inputValue}
                placeholder="Add a comment..."
                onChange={(e)=>setInputValue(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400 px-2"
              />
              <button
                className="text-blue-500 font-semibold disabled:opacity-50 hover:text-blue-400"
                onClick={() => {
                  handlePostComment(ele._id ,i);
                }}
              >
                Post
              </button>
            </div>
          </div>
        );
      })}

{/* *****************Modal code ************* */}
      
      <Modal
        title="Comments"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
            {
                postComments.map((ele,i)=>{
                  return <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#3A3B3C] transition cursor-pointer">
                    <img
                      src={
                        ele?.userId?.profilePicture ||
                        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                      }
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>{ele?.userId?.name}</p>
                    <p>{ele.text}</p>

                  </div>
                })
            }
      </Modal>
    </div>
  );
};

export default PostCard;