import React from 'react'
import "./ChatWindo.css"
import Chat from "./Chat"
export default function ChatWindow() {
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
              <input id='userPrompt' placeholder='Ask anything' type='text'></input>
              {/* <i class="fa-solid fa-microphone microphone"></i> */}
              <button className='button'><i class="fa-regular fa-paper-plane send"></i></button>
           </div>
           <div className='UserNote'>
            <p><b>Vv-GPT can make mistakes.</b> Check important info. See <u>Cookie Preferences.</u></p>
           </div>
      </div>
    </div>
  )
}
