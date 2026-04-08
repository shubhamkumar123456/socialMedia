import React, { useEffect,  useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser} from '../store/AuthSlice'
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import URL from '../getUrl';


// const Navbar = () => {
//   const [showResponsive, setshowResponsive] = useState(true);
//   const [toggler, settoggler] = useState(false);
//   const [users, setUsers] = useState([]);
//   const firends = useSelector((state) => state.auth.searchFriend)
//   const user = useSelector((state) => state.auth.user)

//   const dispatch = useDispatch();
//   const handleLogout = async () => {
//     let res = await fetch(`${URL}/api/users/logout`, {
//       method: "POST",
//       credentials: "include", // 🔥 MUST
//       headers: {
//         'content-type': 'application/json'
//       }
//     });
//     let data = await res.json();
//     console.log(data)

//     dispatch(logoutUser()); // clear redux
//     // redirect
//   }


//   const handleToggleShow = () => {
//     setshowResponsive(!showResponsive)
//   }
//   const [screenSize, setScreenSize] = useState(getCurrentDimension());

//   function getCurrentDimension() {
//     return {
//       width: window.innerWidth,
//       height: window.innerHeight
//     }
//   }

//   useEffect(() => {
//     const updateDimension = () => {
//       setScreenSize(getCurrentDimension())
//     }
//     window.addEventListener('resize', updateDimension);

//     if (screenSize.width > 1000) {
//       setshowResponsive(true)
//     } else {
//       setshowResponsive(false)
//     }


//     return (() => {
//       window.removeEventListener('resize', updateDimension);
//     })
//   }, [screenSize])
//   // console.log(screenSize.width)

//   const handleLinkCLick = () => {
//     if (screenSize.width < 1000) {

//       setshowResponsive(false)
//     }
//   }

//   const handleUserSearch = async(e) => {
//     let name = e.target.value;
//     let res =await fetch(`${URL}/api/users/searchUsers?name=${name}`, {
//       method: 'get',
//       credentials: 'include',
//       headers: {
//         'content-type': 'application/json'
//       },
//     })
//     let data = await res.json();
//     console.log(data)
//     setUsers(data.users)
//   }

//   return (
//     <div className="bg-[#242526] fixed text-white flex items-center justify-between px-4 py-4 right-0 left-0 top-0 z-50 shadow-md">

//       {/* LEFT - LOGO */}
//       <Link to="/" className="text-blue-500 text-2xl font-bold">
//         f
//       </Link>

//       {/* CENTER - SEARCH */}
//       <div className="flex-1  flex justify-center relative">
//         <div className="flex relative  items-center bg-[#3a3b3c] px-4 py-2 rounded-full w-[60%] max-w-md">
//           <input
//             onChange={handleUserSearch}
//             type="text"
//             placeholder="Search Friends"
//             className="bg-transparent outline-none w-full text-sm"
//           />
//           <i
         
//             className="bi bi-search cursor-pointer"
//           ></i>
//           <div className='absolute bg-[#3a3b3c] w-full rounded-2xl left-0 top-full'>
//           {
//             users.map((ele)=>{
//               return <Link
//               onClick={()=>setUsers([])}
//                 key={ele._id}
//                 to={ele._id===user._id?"/profile":"/friends"}
//                 state={ele}
//                 className="flex items-center gap-3 p-2 hover:bg-[#3a3b3c] rounded"
//               >
//                 <img
//                   src={
//                     ele?.profilePicture ? ele.profilePicture :
//                       "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
//                   }
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <p>{ele.name}</p>
//               </Link>
//             })
//           }
//         </div>
//         </div>
        

//         {/* SEARCH DROPDOWN */}
//         {firends.length > 0 && (
//           <div className="absolute top-12 w-[60%] max-w-md bg-[#242526] rounded-lg shadow-lg p-2">
//             <i
//               onClick={handleSerchClose}
//               className="bi bi-x cursor-pointer float-right"
//             ></i>

//             {firends.map((ele) => (
//               <Link
//                 key={ele._id}
//                 to="/friends"
//                 state={ele}
//                 onClick={handleLinkCLick}
//                 className="flex items-center gap-3 p-2 hover:bg-[#3a3b3c] rounded"
//               >
//                 <img
//                   src={
//                     ele?.profilePicture ? ele.profilePicture :
//                       "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
//                   }
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <p>{ele.name}</p>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* RIGHT - ICONS */}
//       <div className="sm:flex hidden items-center gap-3">

//         {/* Home */}
//         <Link
//           to="/"
//           onClick={handleLinkCLick}
//           className="p-2 bg-[#3a3b3c] rounded-full hover:bg-[#4e4f50]"
//         >
//           <AiFillHome className="text-xl" />
//         </Link>

//         {/* Friends */}
//         <Link
//           to="/followers"
//           onClick={handleLinkCLick}
//           className="p-2 bg-[#3a3b3c] rounded-full hover:bg-[#4e4f50]"
//         >
//           <FaUserFriends className="text-xl" />
//         </Link>

//         {/* Messenger */}
//         <div className="relative p-2 bg-[#3a3b3c] rounded-full hover:bg-[#4e4f50] cursor-pointer">
//           <BsMessenger className="text-xl" />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
//             3
//           </span>
//         </div>

//         {/* Notifications */}
//         <div className="relative p-2 bg-[#3a3b3c] rounded-full hover:bg-[#4e4f50] cursor-pointer">
//           <IoNotifications className="text-xl" />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
//             5
//           </span>
//         </div>

//         {/* PROFILE */}


//         {/* MOBILE MENU */}
//         {/* <i
//         onClick={handleToggleShow}
//         className="bi bi-list text-2xl md:hidden cursor-pointer"
//       ></i> */}

//       </div>

//       <div className="relative ml-4 sm:mr-0 mr-4">
//         <img
//           src={user?.profilePicture || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
//           className="w-9 h-9 rounded-full cursor-pointer"
//           onClick={() => settoggler(!toggler)}
//         />

//         {toggler && (
//           <div className="absolute right-0 top-12 bg-[#242526] w-44 rounded-lg shadow-lg flex flex-col">
//             <Link to="/profile" className="p-2 hover:bg-[#3a3b3c]">
//               Profile
//             </Link>
//             <Link className="p-2 hover:bg-[#3a3b3c]">
//               Account
//             </Link>
//             <p
//               onClick={handleLogout}
//               className="p-2 hover:bg-[#3a3b3c] cursor-pointer"
//             >
//               Logout
//             </p>
//           </div>
//         )}
//       </div>
//       <HiMenu color='white' onClick={handleToggleShow} className="bi bi-list text-2xl md:hidden cursor-pointer" />

//       {/* MOBILE NAV */}
//       {showResponsive && (
//         <div className="absolute top-[103%] right-5 w-[200px] bg-[#242526] flex flex-col items-center gap-4 py-4 md:hidden">
//           <Link onClick={handleLinkCLick} to="/">Home</Link>
//           <Link onClick={handleLinkCLick} to="/followers">Friends</Link>
//           <Link onClick={handleLinkCLick} to="/messages">Messages</Link>
//           <Link onClick={handleLinkCLick} to="/messages">Notification</Link>
//           <Link onClick={handleLinkCLick} to="/messages">Chat</Link>
//         </div>
//       )}
//     </div>
//   );

// }

const Navbar = () => {
  const [showResponsive, setshowResponsive] = useState(false); // Default to false
  const [toggler, settoggler] = useState(false);
  const [users, setUsers] = useState([]);
  
  const login = useSelector((state) => state.auth.login)
  const user = useSelector((state) => state.auth.user)

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await fetch(`${URL}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    dispatch(logoutUser());
  }


    const handleUserSearch = async(e) => {
    let name = e.target.value;
    let res =await fetch(`${URL}/api/users/searchUsers?name=${name}`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
    let data = await res.json();
    console.log(data)
    setUsers(data.users)
  }
  return (
    <div className="bg-[#242526] fixed text-white flex items-center justify-between px-3 py-3 right-0 left-0 top-0 z-50 shadow-md">
      
      {/* LEFT - LOGO */}
      <Link to="/" className="text-blue-500 text-2xl font-bold flex-shrink-0">
        f
      </Link>

      {/* CENTER - SEARCH (Responsive width) */}
     {login && <div className="flex-1 flex justify-center px-2 relative">
        <div className="flex relative items-center bg-[#3a3b3c] px-3 py-1.5 rounded-full w-full max-w-[250px] md:max-w-md">
          <input
            onChange={handleUserSearch}
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-[16px] md:text-sm" // 16px stops iOS zoom
          />
          <i className="bi bi-search cursor-pointer text-gray-400"></i>
          
          {/* RESULTS DROPDOWN */}
          {users.length > 0 && (
            <div className='absolute bg-[#3a3b3c] w-full rounded-xl left-0 top-full mt-2 shadow-2xl border border-gray-600 overflow-hidden'>
              {users.map((ele) => (
                <Link
                  onClick={() => setUsers([])}
                  key={ele._id}
                  to={ele._id === user?._id ? "/profile" : "/friends"}
                  state={ele}
                  className="flex items-center gap-3 p-3 hover:bg-[#4e4f50] transition"
                >
                  <img src={ele?.profilePicture || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} className="w-8 h-8 rounded-full" />
                  <p className="text-sm truncate">{ele.name}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>}

      {/* RIGHT - DESKTOP ICONS (Hidden on mobile) */}
      <div className="hidden md:flex items-center gap-2">
        <Link to="/" className="p-2 bg-[#3a3b3c] rounded-full hover:bg-[#4e4f50]"><AiFillHome className="text-xl" /></Link>
        <Link to="/followers" className="p-2 bg-[#3a3b3c] rounded-full hover:bg-[#4e4f50]"><FaUserFriends className="text-xl" /></Link>
        <div className="relative p-2 bg-[#3a3b3c] rounded-full hover:bg-[#4e4f50] cursor-pointer">
          <BsMessenger className="text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1 rounded-full">3</span>
        </div>
      </div>

      {/* USER PROFILE & MOBILE TOGGLE */}
      <div className="flex items-center gap-2 ml-2">
        <div className="relative">
          <img
            src={user?.profilePicture || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full cursor-pointer object-cover border border-gray-600"
            onClick={() => settoggler(!toggler)}
          />
          {toggler && (
            <div className="absolute right-0 top-11 bg-[#242526] w-40 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
              {login &&<Link to="/profile" onClick={() => settoggler(false)} className="block p-3 hover:bg-[#3a3b3c] text-sm">Profile</Link>}
              {!login &&<Link to="/login" onClick={() => settoggler(false)} className="block p-3 hover:bg-[#3a3b3c] text-sm">Login</Link>}
              {!login &&<Link to="/signup" onClick={() => settoggler(false)} className="block p-3 hover:bg-[#3a3b3c] text-sm">Signup</Link>}
              {login &&<p onClick={handleLogout} className="p-3 hover:bg-[#3a3b3c] cursor-pointer text-sm text-red-400">Logout</p>}
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
       {login && <HiMenu 
          onClick={() => setshowResponsive(!showResponsive)} 
          className="text-2xl md:hidden cursor-pointer hover:text-blue-500 transition" 
        />}
      </div>

      {/* MOBILE NAV DROPDOWN */}
      {showResponsive && (
        <div className="absolute top-full right-0 w-48 bg-[#242526] shadow-2xl border-t border-gray-700 flex flex-col md:hidden animate-in slide-in-from-top-2">
          <Link className="p-4 border-b border-gray-700" to="/" onClick={() => setshowResponsive(false)}>Home</Link>
          <Link className="p-4 border-b border-gray-700" to="/followers" onClick={() => setshowResponsive(false)}>Friends</Link>
          <Link className="p-4 border-b border-gray-700" to="/messages" onClick={() => setshowResponsive(false)}>Messages</Link>
        </div>
      )}
    </div>
  );
}
export default Navbar
