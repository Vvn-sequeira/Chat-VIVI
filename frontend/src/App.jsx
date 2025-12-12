import { useState } from 'react'
import './App.css'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'
import Chat from './Chat'
import { Mycontext } from './MyContext'
import {v1 as uuidv1} from "uuid"

function App() {
  const [prompt , setPrompt] = useState("")
  const [reply , setReply] = useState(null)
  const [currentThreadId , setCurrentThreadId] = useState(uuidv1())

  const ProviderValues = {
    prompt , setPrompt ,
    reply , setReply ,
    currentThreadId , setCurrentThreadId
  }; // Passing Values 

  return (
    <div className='app'>
      <Mycontext.Provider value={ProviderValues}>
          <Sidebar></Sidebar>
          <ChatWindow></ChatWindow>
      </Mycontext.Provider>
    </div>
  )
}

export default App
