import { useContext } from "react"
import React from 'react'
import "./Chat.css"
import { Mycontext  } from './MyContext'
export default function Chat() {
  const {newChat, prevChats} = useContext(Mycontext)
  return (
    <div>
      {newChat && <div className="NewChatDIV"> <h1>Where should we begin?</h1> </div>}
      <div className="Chats">
        <div className="Aireply">
            <div className="userDiv">
            <p className="userMessage">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque perferendis saepe porro facere quisquam assumenda cumque enim, dignissimos placeat laborum neque aut veritatis voluptate ducimus optio quas dolor eos, necessitatibus at nam! Soluta explicabo exercitationem nihil. Excepturi itaque exercitationem deleniti.</p>
         </div>
         <div className="GPTdiv">
            <p className="GPTMessage">GPT Message</p>
         </div>
        </div>
         <hr></hr>
                 <div className="Aireply">
            <div className="userDiv">
            <p className="userMessage">User Message</p>
         </div>
         <div className="GPTdiv">
            <p className="GPTMessage">GPT Message</p>
         </div>
        </div>
        <hr />
                <div className="Aireply">
            <div className="userDiv">
            <p className="userMessage">User Message</p>
         </div>
         <div className="GPTdiv">
            <p className="GPTMessage">GPT Message</p>
         </div>
        </div>
        <hr />
      </div>
    </div>
  )
}
