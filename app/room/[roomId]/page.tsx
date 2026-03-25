
'use client'
import { useEffect,useState } from 'react'
import { supabase } from '@/lib/supabase'
import QRCode from 'react-qr-code'
import * as XLSX from 'xlsx'

export default function Room({params}:{params:{roomId:string}}){
  const {roomId}=params
  const [items,setItems]=useState([])
  const [name,setName]=useState('')
  const [price,setPrice]=useState(0)
  const [qty,setQty]=useState(1)
  const [search,setSearch]=useState('')

  const fetchItems=async()=>{
    const {data}=await supabase.from('items').select('*').eq('room_id',roomId)
    setItems(data||[])
  }

  useEffect(()=>{fetchItems()},[])

  const addItem=async()=>{
    await supabase.from('items').insert([{name,price,quantity:qty,room_id:roomId}])
    fetchItems()
  }

  const consume=async(item:any)=>{
    await supabase.from('items').update({quantity:item.quantity-1}).eq('id',item.id)
    fetchItems()
  }

  const exportExcel=()=>{
    const ws=XLSX.utils.json_to_sheet(items)
    const wb=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,ws,"items")
    XLSX.writeFile(wb,"costrack.xlsx")
  }

  const filtered = items.filter((i:any)=>i.name?.toLowerCase().includes(search.toLowerCase()))

  const subtotal = filtered.reduce((a:any,b:any)=>a+(b.price*b.quantity),0)

  return (
    <div style={{padding:20}}>
      <h2>Room {roomId}</h2>

      <QRCode value={typeof window!=='undefined'?window.location.href:''} />

      <input placeholder="Search" onChange={e=>setSearch(e.target.value)} />

      <div>
        <input placeholder="Item" onChange={e=>setName(e.target.value)} />
        <input type="number" placeholder="Price" onChange={e=>setPrice(Number(e.target.value))} />
        <input type="number" placeholder="Qty" onChange={e=>setQty(Number(e.target.value))} />
        <button onClick={addItem}>Add</button>
      </div>

      <button onClick={exportExcel}>Export Excel</button>

      <div>
        {filtered.map((item:any)=>(
          <div key={item.id} style={{background:'white',marginTop:10,padding:10}}>
            <b>{item.name}</b>
            <div>${item.price} x {item.quantity}</div>
            <button onClick={()=>consume(item)}>-1</button>
          </div>
        ))}
      </div>

      <h3>Subtotal: ${subtotal}</h3>
    </div>
  )
}
