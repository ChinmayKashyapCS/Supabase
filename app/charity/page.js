"use client"
import { useEffect,useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Charity() {
  const [list,setList]=useState([])

  useEffect(()=>{
    supabase.from("charities").select("*").then(res=>setList(res.data))
  },[])

  return (
    <div>
      <h1>Charities</h1>
      {list.map(c=>(
        <p key={c.id}>{c.name}</p>
      ))}
    </div>
  )
}
const subscribe = async () => {
  const user = JSON.parse(localStorage.getItem("user"))

  await supabase.from("subscriptions").insert({
    user_id:user.id,
    plan:"monthly",
    status:"active"
  })

  alert("Subscribed")
}