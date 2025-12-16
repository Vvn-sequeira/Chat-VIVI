import React, { useContext , useState , useEffect } from 'react'
import "./ChatWindo.css"
import Chat from "./Chat"
import { Mycontext  } from './MyContext'
import {RingLoader} from "react-spinners"
const API_URL = import.meta.env.VITE_API_URL;
export default function ChatWindow() {
  const {prompt , setPrompt , reply , setReply , currentThreadId , newChat , Open , setOpen , prevChats , setPrevChats , setNewChat} = useContext(Mycontext)
  let [loading, setLoading] = useState(false);
  const getReply = async ()=>{
    setNewChat(false)
    setLoading(true)
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
      const  res = await fetch(`${API_URL}/api/chat` , options)
      const replyy = await res.json()
      console.log("Reply after Json formate : ", replyy.Reply)
     
      setReply(replyy.Reply)
      setLoading(false)
    } catch (error) {
      console.log("err: ", error)
    }
  }
   
  // Append new messages 
  useEffect( () => {
     if(prompt && reply){
        setPrevChats(prevCht=> (
          [
            ...prevCht , 
          {
            role: "user",
            content: prompt
          },
          {
            role : "assistant",
            content : reply
          }
        ]
        ))
     }

     setPrompt("")
  }, [reply])

  const CloseSideBar = ()=> {
    //  setOpen(false) 
  }
  return (
    <div  onClick={CloseSideBar} className='ChatWindow' style={{height:"100vh" }}>
      
      <div className='Navbar'>
        <i  onClick={()=> setOpen(true)} className={Open ? "NONE" : "fa-solid fa-left-right"}></i>
        <a href='#'>Vv-GPT <span style={{opacity: 0.3 , fontSize: "12px"}}>5.5</span> <i  style={{opacity: 0.4}} class="fa-solid fa-arrow-down"></i> </a>
        <a href='#'><i class="fa-solid fa-user"></i></a>
      </div>
      <div className= {newChat ? "NewChat" : "Chat"}>
           <Chat></Chat>
      </div>
       <div className='Loader'>
          <RingLoader color='white' loading={loading} ></RingLoader>
      </div>
      <div className='Input'>
           <div className='UserInput'>
              <i class="fa-solid fa-plus"></i>
              <input id='userPrompt' placeholder='Ask anything' type='text'
              value={prompt} onChange={(e) => setPrompt(e.target.value) }
              onKeyDown={(e)=> e.key === "Enter" ? getReply() : "" }
              ></input>
              {/* <i class="fa-solid fa-microphone microphone"></i> */}
              <button className='button' onClick={getReply}><i class="fa-regular fa-paper-plane send"></i></button>
           </div>
           <div className= {newChat ? "NONE" : "UserNote"}>
            <p><b>Vv-GPT can make mistakes.</b> Check important info. See <u>Cookie Preferences.</u></p>
           </div>
      </div>
    </div>
  )
}
