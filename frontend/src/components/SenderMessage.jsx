import React, { useEffect, useRef } from "react";

const SenderMessage = ({ text, image }) => {
  const scroll= useRef(null)
  useEffect(()=>{
    scroll.current.scrollIntoView({behavior:"smooth"})
  },[image,text])
  function handleOnLoad(){
    scroll.current.scrollIntoView({behavior:"smooth"})
  }
  return (
    <div className="flex justify-end mb-2" ref={scroll}>
      <div className="bg-purple-500 text-white p-1 rounded-lg max-w-[200px] break-words">
        {image && (
          <img
            src={image}
            alt="sent"
            className="mb-2 max-w-full rounded-md"
            onLoad={handleOnLoad}
          />
        )}
       <p className="p-2 " >{text}</p> 
      </div>
    </div>
  );
};

export default SenderMessage;