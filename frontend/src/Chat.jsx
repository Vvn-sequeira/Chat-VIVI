import { useContext } from "react";
import React from "react";

import { Mycontext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./Chat.css";

export default function Chat() {
  const { newChat, prevChats } = useContext(Mycontext);
  console.log("This is my PrevChats after getting set  ", prevChats);
  return (
    <div>
      {newChat && (
        <div className="NewChatDIV">
          {" "}
          <h1>Where should we begin?</h1>{" "}
        </div>
      )}
      <div className="Chats">
        {prevChats?.map((chat, idx) => (
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
          /*{/* {
              Chat.role ==="assistant"?
              <hr></hr> :
              ""
            } */
        ))}
      </div>
    </div>
  );
}
