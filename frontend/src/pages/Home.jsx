import React from "react";
import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";
import getMessage from "../hooks/getMessage";

const Home = () => {
  getMessage()
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      <Sidebar />
      <MessageArea />
    </div>
  );
};

export default Home;
