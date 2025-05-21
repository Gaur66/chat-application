import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch, FiX, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { setSelectedData, setUserData, setSearchUser } from "../redux/userSlice";
import avatar from "../assets/avatar2.webp";
import axios from "axios";
import { serverUrl } from "../main";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsers, userData, selectedUser, onlineUsers, searchUser } = useSelector((state) => state.user);

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllActive, setShowAllActive] = useState(false);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // Search users from API
  useEffect(() => {
    const fetchSearch = async () => {
      try {
        if (searchTerm.trim()) {
          const { data } = await axios.get(`${serverUrl}/api/user/search?query=${searchTerm}`,{withCredentials:true});
     
          dispatch(setSearchUser(data));
        } else {
          dispatch(setSearchUser([]));
        }
      } catch (err) {
        console.error("Search failed:", err);
      }
    };

    const delayDebounce = setTimeout(fetchSearch, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // List of users to show (search or all)
  const usersToShow = searchTerm ? searchUser : allUsers;

  // Filter online users
  const activeUsers = allUsers?.filter((u) => onlineUsers?.includes(u._id)) || [];

  const visibleActiveUsers = showAllActive ? activeUsers : activeUsers.slice(0, 5);

  return (
    <div className={`h-screen w-full lg:w-[30%] ${selectedUser ? "hidden" : "block"} lg:block bg-slate-300 text-white relative`}>
      {/* Content */}
      <div className="h-full overflow-y-auto p-4 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 inline-block text-transparent bg-clip-text">
            Chit-Chat
          </h2>
          <div
            className="flex items-center gap-3 bg-slate-200 rounded-lg px-3 py-1 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <p className="text-lg text-black font-medium">{userData?.name || "unknown user"}</p>
            <img
              src={userData?.image || avatar}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          {!showSearch && (
            <button
              onClick={() => setShowSearch(true)}
              className="bg-white p-2 rounded-full text-black shadow-md"
            >
              <FiSearch size={20} />
            </button>
          )}

          {showSearch && (
            <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 mt-2">
              <FiSearch className="text-gray-500 ml-3" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-2 py-2 text-black focus:outline-none"
              />
              <button
                onClick={() => {
                  setSearchTerm("");
                  setShowSearch(false);
                }}
                className="text-gray-500 pr-3 hover:text-red-500"
              >
                <FiX size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Active Users */}
        <div className="mb-4">
          <h3 className="text-black text-sm font-semibold mb-2">Active Users</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {visibleActiveUsers.map((u) => (
              <div key={u._id} className="relative">
                <img
                  src={u.image || avatar}
                  alt={u.name}
                  title={u.name}
                  className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover cursor-pointer hover:scale-105 transition-transform shadow-lg"
                  onClick={() => dispatch(setSelectedData(u))}
                />
                <span className="w-[12px] h-[12px] rounded-full bg-[#2f9222] absolute right-1 bottom-0 shadow-md" />
              </div>
            ))}
            {activeUsers.length > 5 && !showAllActive && (
              <button
                onClick={() => setShowAllActive(true)}
                className="text-xs text-black underline"
              >
                +{activeUsers.length - 5} more
              </button>
            )}
          </div>
        </div>

        {/* User List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {usersToShow?.map((u) => (
            <div
              key={u._id}
              onClick={() => dispatch(setSelectedData(u))}
              className="bg-white text-black border-purple-500 border-2 flex items-center gap-3 p-1 rounded-xl shadow-md hover:bg-gray-100 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={u.image || avatar}
                  alt={u.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span
                  className={`w-[12px] h-[12px] rounded-full absolute right-1 bottom-0 shadow-md ${
                    onlineUsers?.includes(u._id) ? "bg-[#2f9222]" : "bg-[#e84858]"
                  }`}
                />
              </div>
              <span className="font-medium">{u.name || "unknown user"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute bottom-4 left-4 flex items-center justify-center bg-white border-2 border-purple-500 text-black w-10 h-10 rounded-full shadow-lg hover:bg-red-50"
        aria-label="Logout"
      >
        <FiLogOut size={20} />
      </button>
    </div>
  );
};

export default Sidebar;
