import React, { useContext } from 'react'
import "./ChatWindo.css"
import Chat from "./Chat"
import { Mycontext } from './MyContext'
export default function ChatWindow() {
  const {prompt , setPrompt , reply , setReply , currentThreadId } = useContext(Mycontext)

  const getReply = async ()=>{

    const options = {
      method : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message : prompt , 
        threadId : currentThreadId 
      })
    };
    console.log(options)

    try {
      const  res = await fetch("http://localhost:8080/api/chat" , options)
      console.log(res)
    } catch (error) {
      console.log("err: ", error)
    }
  }
  return (
    <div className='ChatWindow'>
      <div className='Navbar'>
        <a href='#'>Vv-GPT <span style={{opacity: 0.3 , fontSize: "12px"}}>5.5</span> <i  style={{opacity: 0.4}} class="fa-solid fa-arrow-down"></i> </a>
        <a href='#'><i class="fa-solid fa-user"></i></a>
      </div>
      <div className='Chat'>
           <Chat></Chat>
      </div>
      <div className='Input'>
           <div className='UserInput'>
              <i class="fa-solid fa-plus"></i>
              <input id='userPrompt' placeholder='Ask anything' type='text'
              value={prompt} onChange={(e) => setPrompt(e.target.value) }
              ></input>
              {/* <i class="fa-solid fa-microphone microphone"></i> */}
              <button className='button' onClick={getReply}><i class="fa-regular fa-paper-plane send"></i></button>
           </div>
           <div className='UserNote'>
            <p><b>Vv-GPT can make mistakes.</b> Check important info. See <u>Cookie Preferences.</u></p>
           </div>
      </div>
    </div>
  )
}
