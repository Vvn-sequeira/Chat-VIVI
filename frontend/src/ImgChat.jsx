import { useContext, useState, useEffect } from "react";
import React from "react";

import { Mycontext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./Chat.css";

export default function ImgChat() {
  const {
    ImgPrompt,
    setImgPrompt,
    prompt,
    getUrl,
    setUrl,
    imgURL,
    setImgURL,
    newChat,
    newImg,
    setNewImg,
    toggle,
    setToggle,
  } = useContext(Mycontext);
  // console.log("This is my PrevChats after getting set  ", prevChats);

  //  useEffect(()=>{

  //  },[prevChats , reply])
  // useEffect(() => {
  //   const loadImage = async () => {

  //     const url = getUrl;

  //     const res = await fetch(url);
  //     const blob = await res.blob();
  //     const objectURL = URL.createObjectURL(blob);

  //     setImgURL(objectURL);
  //   };

  //   loadImage();

  //   return () => {
  //     if (imgURL) URL.revokeObjectURL(imgURL);
  //   };
  // }, [setUrl]);
  return (
    <div>
      {newImg && (
        <div className="NewChatDIV">
          {" "}
          <h1>What's on your Mind?</h1>{" "}
        </div>
      )}
      <div className="Chats">
      
              <div className="userDiv">
                {" "}
                {ImgPrompt ? (
                  ImgPrompt.map((prompt, idx) => (
                    <div className="userMessage" key={idx}>{prompt}</div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
              <div className="GPTdiv">
                {" "}
                {getUrl.length !== 0 ? (
                  getUrl.map((Url, idx) => (
                    <div key={idx}>
                      <div className="userMessage">
                        heres is your requested image! 
                      </div>
                      <img
                        style={{ backgroundColor:"#303030" , padding:"30px" , marginTop:"12px " , width:"500px" , height:"auto "}}
                        src={Url}
                        alt=" Something went Wrong while Generating the Image please try again later!"
                      />
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
          </div>
        
      </div>
  );
}

{
  /* <img style={{width:"500px" , height:"auto"}} src={getUrl} alt=" generated" />  */
}

// {
//           <div className="userDiv">
//           {ImgPrompt ? (
//             ImgPrompt.map((prompt, idx) => (
//               <div className="userMessage">{prompt}</div>
//             ))
//           ) : (
//             <div></div>
//           )}
//         </div>
//         <div className="GPTdiv">
//           {getUrl.length !== 0 ? (
//             getUrl.map((Url, idx) => (
//               <div>
//                 <div className="userMessage">
//                   heres is your requested image!
//                 </div>
//                 <img
//                   style={{ width: "500px", height: "auto" }}
//                   src={Url}
//                   alt=" Something went Wrong while Generating the Image please try again later!"
//                 />
//               </div>
//             ))
//           ) : (
//             <div></div>
//           )}
//         </div>
// }
