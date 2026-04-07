import { useSelector } from "react-redux";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { useRef, useState } from "react";
import url from "../getUrl";
import EmojiPicker from 'emoji-picker-react';

const PostCreate = (props) => {
  const {getPosts} = props
  const getUser = useSelector((state) => state.auth);
  console.log(getUser)
  console.log(getUser.user.profilePicture)
   const inputRef = useRef()
  


    const [allFiles, setallFiles] = useState([]);
    const [emojiOpen, setEmojiOpen] = useState(false);
    console.log(allFiles)
    const handleInputChange =async(e)=>{
    let files = [...e.target.files]
      setallFiles(files)
  }
  const handleCancelPreview =(i)=>{
    console.log("clicked");
    let filtered = allFiles.filter((ele,index)=>{
      return index!==i
    })
    setallFiles(filtered)
  
  }

  const handlePost =async()=>{
    let input = inputRef.current.value
    
    let formData = new FormData();
    formData.append('desc',input);
  

     for (let i = 0; i < allFiles.length; i++) {
    formData.append("files", allFiles[i]);
  }

    let response = await fetch(url+'/api/posts/create',{
      method:"POST",
      credentials:"include",
      body:formData
  })
  let data = await response.json();
  console.log(data);
  
  // dispatch(fetchUser())

      // setImg(data.user.coverPicture);
      // console.log("image uploaded successfully");
    inputRef.current.value = ''
    getPosts()
    setallFiles([])
      
  }

  const handleEmojiCLick = (e) => {
    inputRef.current.value += e.emoji;
  };


  return (
    <div className="w-full max-w-xl mx-auto mt-4">

      {/* CREATE POST CARD */}
      <div className="bg-[#242526] rounded-lg p-4 shadow-md">

        {/* TOP */}
        <div className="flex items-center gap-3">
          <img
            src={getUser?.user?.profilePicture ||'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
            className="w-10 h-10 rounded-full"
          />

          <textarea
            className="flex-1 bg-[#3a3b3c] text-white rounded-full px-4 py-2 resize-none outline-none placeholder-gray-400"
            rows={1}
  
            ref={inputRef}
  
            placeholder="What's on your mind?"
          />
        </div>

        {/* DIVIDER */}
        <hr className="border-gray-600 my-3" />

        {/* ACTIONS */}
        <div className="flex relative justify-between text-gray-300 text-sm">

          {/* PHOTO */}
          <label className="flex items-center gap-2 cursor-pointer hover:bg-[#3a3b3c] p-2 rounded-lg flex-1 justify-center">
            <BsImage className="text-green-500 text-lg" />
            Photo/Video
            <input type="file" onChange={handleInputChange} multiple className="hidden" />
          </label>

          {/* FEELING */}
          <button onClick={()=>setEmojiOpen(!emojiOpen)} className="flex items-center gap-2 hover:bg-[#3a3b3c] p-2 rounded-lg flex-1 justify-center">
            <BsEmojiSmile className="text-yellow-400 text-lg" />
            Feeling
          </button>
            <div className="absolute top-full z-30 right-5">
          <EmojiPicker open={emojiOpen} theme="dark" onEmojiClick={handleEmojiCLick} />
        </div>
        </div>
        
      </div>

      {/* PREVIEW SECTION */}
      { (
        <div className="bg-[#242526] rounded-lg p-4 shadow-md mt-3 relative">

          


          <div>
            {allFiles?.map((ele,i)=>{
              console.log(ele)
              return <div className="relative">
                <button
            onClick={()=>handleCancelPreview(i)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            ✖
          </button>
               {ele.type.includes("image")?<img src={URL.createObjectURL(ele)} className="rounded-lg mb-2"/>:<video controls src={URL.createObjectURL(ele)} className="rounded-lg mb-2"/>}
              </div> 
            })}
          </div>

          <button
            onClick={handlePost}
            className="mt-3 w-full bg-blue-600 py-2 rounded-md hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      )}

      {/* TIMELINE POSTS */}
      {/* <div className="mt-4 space-y-4">
        {timlinePost.map((post) => (
          <div
            key={post._id}
            className="bg-[#242526] rounded-lg p-4 shadow-md"
          >
            <p className="text-white mb-2">{post.desc}</p>

            {post.img && (
              <img src={post.img} className="rounded-lg mb-2" />
            )}

            <p className="text-gray-400 text-sm text-center">
              ❤️ {post.likes.length}
            </p>
          </div>
        ))}

        {timlinePost.length <= 0 && (
          <p className="text-gray-400 text-center">
            No posts yet. Follow users to see posts.
          </p>
        )}
      </div> */}
    </div>
  );
};

export default PostCreate;