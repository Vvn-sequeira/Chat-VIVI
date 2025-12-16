import React from 'react'
import "./Sidebar.css"
import { useContext , useState } from 'react'
import { Mycontext } from './MyContext'
import { useEffect } from 'react'
import { v1 as uuidv1 } from 'uuid'

export default function Sidebar() {


 const {Open , setOpen,currentThreadId , setNewChat , setPrompt , setReply ,setCurrentThreadId , setPrevChats } = useContext(Mycontext )
 const [item , setItem] = useState()
  const items = Array.from({length:20})

  const getAllThread = async() => {
     
     const response = await fetch("http://localhost:8080/api/thread")
     const res = await response.json() 
    //  console.log(res)
     const filterdThread = res.map((thread)=> (
        {threadId: thread.threadId , title: thread.title }
     ))
    setItem(filterdThread)
  }

  useEffect(()=>{
   getAllThread()
  },[currentThreadId])


  const CreateANewChat = ()=> {
    setNewChat(true)
    setPrompt("")
    setReply(null)
    setCurrentThreadId(uuidv1())
    setPrevChats([])
  }

  const changeThread = async(NewId)=> {
   setCurrentThreadId(NewId)

   try {
     const res = await fetch(`http://localhost:8080/api/thread/${NewId}`)
     const response = await res.json() 
     console.log(response)
     setPrevChats(response)
     setNewChat(false)
     setReply(null)
   } catch (error) {
     console.log(error)
   }
  } 

  const DeleteThread = async(id)=> {
     try {
      const deletedThread = await fetch(`http://localhost:8080/api/thread/${id}` , {method: "DELETE"})
      alert("Thread Deleted!!")

     // re-rednder 
     setItem(prev => prev.filter(thread=> thread.threadId !== id))
    
     } catch (error) {
      console.log(error)
     }
  }
  return (
    <div className={Open ? "Sidebar" : "NONE"} style={{width:"380px" }}>
      {/* Top bar */}
          <div style={{display:"flex" , justifyContent:"space-between" , padding:"16px" , alignItems:"center"}}>
            <img src='src/assets/ChatGPT.png' style={{width:"45px" , marginLeft:"-12px" }}></img>
            <i onClick={()=>setOpen(false)} class="fa-solid fa-xmark" style={{fontSize:"19px "}} ></i>
          </div>
      {/* Nav for Side bar   */}
           <nav className='NavSidebar'>
              <a onClick={CreateANewChat} href='#'><i class="fa-solid fa-pen-to-square"></i> New chat</a>
              <a href='#'><i class="fa-solid fa-magnifying-glass"></i> Search</a>
              <a href='#'><i class="fa-solid fa-photo-film"></i> Library </a>
           </nav>
      {/* history */}
           <div className='History'>
             <nav className='NavSidebar'>
              <a href='#'><i class="fa-solid fa-list"></i> GPTs</a>
              <a href='#'><i class="fa-solid fa-folder-open"></i> Projects</a>
             </nav>
             <div className='smallText '>
               <p style={{opacity:"0.6"}}>Your chats</p>
             </div>
             <div className='HistoryChats'>
                {
                  item?.map((thread , index)=> (
                      <a onClick={()=> changeThread(thread.threadId)} key={thread.threadId} href='#'>{(thread.title).slice(0 , 30)} <i onClick={ (e)=>{  e.stopPropagation() ; DeleteThread(thread.threadId)}} class="fa-solid fa-ellipsis"></i> </a>
                  ))
                }
              </div>
           </div>
           {/* User Details  */}
           <div className='UserDetails'>
             <div><i class="fa-solid fa-circle-user user-logo"></i></div>
             <div className='User-info'>
               <b>Vivian Sequeira</b>
               <small>Go</small>
             </div>
           </div>
    </div>
  )
}