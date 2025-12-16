import { useContext , useState , useEffect } from "react";
import React from "react";

import { Mycontext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./Chat.css";

export default function Chat() {

  const { newChat, prevChats , reply } = useContext(Mycontext);
  const [latestReply , setLatestReply] = useState(null)
  console.log("This is my PrevChats after getting set  ", prevChats);

 useEffect(()=>{

  if(reply === null){
    setLatestReply(null)
    return;
  }


   if(!prevChats?.length) return; 

   const content = reply.split(" ") // individual words 

   let idx = 0 
   const interval = setInterval(()=> {
    setLatestReply(content.slice(0 , idx+1).join(" "))
    idx++
    if(idx >= content.length) clearInterval(interval);
   }, 40)

   return () => clearInterval(interval)

 },[prevChats , reply])

  return (
    <div>
      {newChat && (
        <div className="NewChatDIV">
          {" "}
          <h1>Where should we begin?</h1>{" "}
        </div>
      )}
      <div className="Chats">
        {  prevChats?.slice(0 , -1).map((chat, idx) => (
          <div className="Aireply" key={idx}>
            <div className={chat.role === "user" ? "userDiv" : "GPTdiv"}>
              {chat.role === "user" ? (
                <p className="userMessage">{chat.content}</p>
              ) : (
                <div className="GPTMessage">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {chat.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>

    
        )

        )}

        {
           prevChats.length > 0 && latestReply !== null && 
          <div className="GPTMessage" key={"Typeing"}>
             <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {latestReply}
              </ReactMarkdown>
           </div>
        }
        {
           prevChats.length > 0 && latestReply === null && 
          <div className="GPTMessage" key={"NON-Typeing"}>
             <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {prevChats[prevChats.length-1].content}
              </ReactMarkdown>
           </div>
        }
      </div>
    </div>
  );
}
