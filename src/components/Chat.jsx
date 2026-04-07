import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ScrollToBottom from 'react-scroll-to-bottom';
import FriendList from './FriendList';
import URL from '../getUrl';
import { socket } from '../socket';

// let socket;
const Chat = () => {
    
  const [messages, setMessages] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const location = useLocation();
    let currentUser = location.state.userDetail;
    let friendUser = location.state.user
    console.log(friendUser)
    console.log(messages)     

    const handleInputChange =(e)=>{
            setinputValue(e.target.value);
        }
        
    const handleSendMessage = async()=>{
            
            socket.emit('sendMessage',{
                senderId:currentUser._id,
                recieverId:friendUser._id,
                text:inputValue
            })
            
            
            let res = await fetch(URL+`/api/messages/create/${friendUser._id}`,{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({sender:currentUser._id,text:inputValue})
            });

            let data = await res.json();
            console.log(data)
            setMessages((prev)=>[...prev,{sender:currentUser._id,text:inputValue,createdAt:Date.now(),reciever:friendUser._id}])
            setinputValue("")
            // console.log(data);
        }

        

    const handleGetMessage = async()=>{
    let res = await fetch(URL+`/api/messages/getChat/${friendUser._id}`,{
        method: 'get',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
    });
    let data = await res.json();
    console.log(data)
    setMessages(data?.chat?.messages || [])
   
}    
        
        
useEffect(()=>{
    handleGetMessage()
},[friendUser?._id])


useEffect(()=>{
    socket.on('getMessage',data=>{
        console.log(data)
        setMessages((prev)=>[...prev,{sender:data.senderId,text:data.text,createdAt:data.createdAt,reciever:data.recieverId}])
    })
},[])


  return (
  <div className="h-[calc(100vh-65px)] bg-[#18191a] text-white flex">

    {/* LEFT SIDEBAR */}
    <div className="hidden md:block  w-1/5">
      <div className="sticky top-20  ">
        <FriendList />
      </div>
    </div>

    {/* RIGHT CHAT SECTION */}
    <div className="flex-1 flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#242526] border-b border-gray-700">

        <div className="flex items-center gap-3">
          <img
            src={friendUser.profilePicture}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{friendUser.name}</p>
            <span className="text-xs text-green-400">Active now</span>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setshowSidebar(!showSidebar)}
          className="md:hidden text-xl"
        >
          ☰
        </button>
      </div>

      {/* CHAT MESSAGES */}
      <ScrollToBottom className="flex-1 overflow-y-auto px-3 py-4 space-y-3">

  {messages?.map((msg, index) => {
    const isOwn = msg.sender === currentUser._id;
    // console.log(isOwn)
    // console.log(msg.sender)
    // console.log(currentUser._id)

    return (
      <div
        key={index}
        className={`flex items-end my-2 gap-2 ${
          isOwn ? "justify-end" : "justify-start"
        }`}
      >

        {/* FRIEND PROFILE PIC */}
        {!isOwn && (
          <img
            src={friendUser.profilePicture}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}

        {/* MESSAGE BUBBLE */}
        <div
          className={`px-4 py-2 max-w-[70%] text-sm rounded-2xl ${
            isOwn
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-[#3a3b3c] text-white rounded-bl-none"
          }`}
        >
          {msg.text}
        </div>

        {/* CURRENT USER PROFILE PIC */}
        {isOwn && (
          <img
            src={currentUser.profilePicture}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
      </div>
    );
  })}

</ScrollToBottom>

      {/* INPUT BOX */}
      <div className="bg-[#242526] border-t border-gray-700 p-3 flex items-center gap-3">

        <input
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-[#3a3b3c] px-4 py-2 rounded-full outline-none text-sm"
        />

        <button
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm"
        >
          Send
        </button>

      </div>

    </div>
  </div>
);
}

export default Chat
