import React,{useEffect,useRef} from "react";

const ReceiverMessage = ({ text, image }) => {
      const scroll= useRef(null)
      useEffect(()=>{
        scroll.current.scrollIntoView({behavior:"smooth"})
      })
      function handleOnLoad(){
        scroll.current.scrollIntoView({behavior:"smooth"})
      }
  return (
    <div className="flex justify-start mb-2" ref={scroll}>
      <div className="bg-gray-300 text-black p-2 rounded-lg max-w-[200px] break-words">
        {image && (
          <img
            src={image}
            alt="received"
            className="mb-2 max-w-full rounded-md"
            onLoad={handleOnLoad}
          />
        )}
           <p className="p-2 " >{text}</p> 
      </div>
    </div>
  );
};

export default ReceiverMessage;
