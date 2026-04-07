import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import URL from "../getUrl";

const FriendList = () => {
  const userDetail = useSelector((state) => state.auth.user);
  console.log(userDetail)
  const [users, setUsers] = useState([]);
  console.log(users)

  useEffect(() => {
    const getUsers = async () => {
      try {
        let res = await fetch(URL+`/api/messages/getConversation`, {
          method: "get",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        });

        let data = await res.json();
        console.log(data)
        setUsers(data?.users || []);
      } catch (err) {
        console.log(err);
      }
    };

    if (userDetail?._id) getUsers();
  }, [userDetail]);

  return (
    <div className="hidden lg:flex  border-r-2 border-amber-300 flex-col w-[300px] h-[calc(100vh-70px)] bg-[#18191A] text-white border-l border-gray-700 fixed left-0 top-[70px]">

      {/* Header */}
      <div className="flex items-center justify-center px-4 py-3 border-b border-gray-700">
        <h2 className="text-lg text-center font-semibold">Chats</h2>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">

        {users?.length > 0 ? (
          users.map((user) => (
            user._id!==userDetail._id &&<Link
              key={user._id}
              to={"/chat"}
              state={{ user, userDetail }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#3A3B3C] transition cursor-pointer"
            >
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={user?.profilePicture}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* Online Dot */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#18191A] rounded-full"></span>
              </div>

              {/* Name */}
              <p className="text-sm font-medium">{user?.name}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center mt-4">
            No chats yet
          </p>
        )}

      </div>
    </div>
  );
};

export default FriendList;