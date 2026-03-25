
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export default function Home(){
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')

  const createRoom = async ()=>{
    const id = uuidv4().slice(0,6)
    await supabase.from('rooms').insert([{id,name,password}])
    window.location.href = `/room/${id}`
  }

  return (
    <div style={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center'}}>
      <div style={{background:'white',padding:30,borderRadius:12,width:350}}>
        <h2>Create Room</h2>
        <input placeholder="Room Name" onChange={e=>setName(e.target.value)} />
        <input placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={createRoom}>Create</button>
      </div>
    </div>
  )
}
