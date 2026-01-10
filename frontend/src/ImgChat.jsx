import { useContext , useState , useEffect } from "react";
import React from "react";

import { Mycontext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./Chat.css";

export default function ImgChat() {

  const { newChat, newImg, setNewImg, toggle , setToggle } = useContext(Mycontext);
  // console.log("This is my PrevChats after getting set  ", prevChats);

//  useEffect(()=>{


//  },[prevChats , reply])

  return (
    <div>
      {newChat && (
        <div className="NewChatDIV">
          {" "}
          <h1>What's on your Mind?</h1>{" "}
        </div>
      )}
      <div className="Chats"></div>
    </div>
  );
}
