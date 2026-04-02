"use client"
import { useEffect,useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Charity() {
  const [list,setList]=useState([])

  useEffect(()=>{
    supabase.from("charities").select("*").then(res=>setList(res.data || []))
  },[])

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl mb-6">Charities</h1>

      {list.map(c=>(
        <div key={c.id} className="bg-gray-800 p-4 mb-3 rounded">
          {c.name}
        </div>
      ))}
    </div>
  )
}
