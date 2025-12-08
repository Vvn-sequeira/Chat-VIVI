import React from 'react'
import "./Sidebar.css"
export default function Sidebar() {

  const items = Array.from({length:20})
  return (
    <div className='Sidebar' style={{width:"260px" }}>
      {/* Top bar */}
          <div style={{display:"flex" , justifyContent:"space-between" , padding:"16px" , alignItems:"center"}}>
            <img src='src/assets/ChatGPT.png' style={{width:"45px" , marginLeft:"-12px" }}></img>
            <i class="fa-solid fa-xmark" style={{fontSize:"19px "}} ></i>
          </div>
      {/* Nav for Side bar   */}
           <nav className='NavSidebar'>
              <a href='#'><i class="fa-solid fa-pen-to-square"></i> New chat</a>
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
                  items.map((_ , index)=> (
                      <a key={index} href='#'>What is AI <i class="fa-solid fa-ellipsis"></i> </a>
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