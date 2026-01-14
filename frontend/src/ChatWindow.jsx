import React, { useContext , useState , useEffect } from 'react'
import "./ChatWindo.css"
import Chat from "./Chat"
import ImgChat from './ImgChat'
import Drop from './dropdownComponent'
import { Mycontext  } from './MyContext'
import {RingLoader} from "react-spinners"
const API_URL = import.meta.env.VITE_API_URL;
export default function ChatWindow() {
  const {ImgPrompt , setImgPrompt,getUrl , setUrl, imgURL , setImgURL , newImg, setNewImg, prompt , setPrompt , reply , setReply , currentThreadId , newChat , Open , setOpen , prevChats , setPrevChats , setNewChat ,toggle , setToggle} = useContext(Mycontext)
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

  const GetImg  = async()=>{
    setNewImg(false)
    setLoading(true)
     const options = {
      method : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        promptt : prompt
      })
    };
    try {
      setImgPrompt(prev => [...prev , prompt])
      let res = await fetch(`${API_URL}/api/getImg` , options)
      const reply = await res.json()
      console.log("Reply after Json formate : ", reply.imageUrl)
      const ress = await fetch(reply.imageUrl)
      const blob = await ress.blob() 
      const objectURL = URL.createObjectURL(blob);
      console.log(ress , objectURL , reply.imageUrl)
      setUrl( prev => [ ...prev , objectURL] )
      // console.log(getUrl)
      setLoading(false)
      
    } catch (error) {
      console.log("err: ", error)
      alert("somthing went wrong !")
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
        {/* <a href='#'>Vv-GPT <span style={{opacity: 0.3 , fontSize: "12px"}}>5.5</span> <i  style={{opacity: 0.4}} class="fa-solid fa-arrow-down"></i> </a> */}
       
         <Drop></Drop>
      
        <a href='#'><i class="fa-solid fa-user"></i></a>
      </div>

      {toggle?
      <div className= {newImg ? "NewChat" : "Chat"}>
         <ImgChat></ImgChat>
      </div>:
      <div className= {newChat ? "NewChat" : "Chat"}>
           <Chat></Chat>
      </div>
     }


       <div className='Loader'>
          <RingLoader color='white' loading={loading} ></RingLoader>
      </div>
      <div className='Input'>
           <div className='UserInput'>
              <i class="fa-solid fa-plus"></i>
              <input id='userPrompt' placeholder='Ask anything' type='text'
              value={prompt} onChange={(e) => setPrompt(e.target.value) }
            
              ></input>
              {/* <i class="fa-solid fa-microphone microphone"></i> */}
              <button className='button' onClick={toggle===0? getReply : GetImg}><i class="fa-regular fa-paper-plane send"></i></button>
           </div>
           <div className= {newChat ? "NONE" : "UserNote"}>
            <p><b>Vv-GPT can make mistakes.</b> Check important info. See <u>Cookie Preferences.</u></p>
           </div>
      </div>
    </div>
  )
}
