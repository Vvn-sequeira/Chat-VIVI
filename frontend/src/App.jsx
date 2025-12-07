import { useState } from 'react'
import './App.css'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'
import Chat from './Chat'
import { Mycontext } from './MyContext'

function App() {
  const ProviderValues = {};

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
