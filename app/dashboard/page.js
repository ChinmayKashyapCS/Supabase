"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Dashboard() {
  const [scores,setScores]=useState([])
  const [user,setUser]=useState(null)

  useEffect(()=>{
    const u = localStorage.getItem("user")
    if(u) setUser(JSON.parse(u))
  },[])

  const load = async (uid) => {
    const {data}=await supabase.from("scores")
      .select("*")
      .eq("user_id",uid)
      .order("created_at",{ascending:false})
      .limit(5)

    setScores(data || [])
  }

  useEffect(()=>{
    if(user) load(user.id)
  },[user])

  const addScore = async () => {
    const score = prompt("Enter score (1-45)")
    await supabase.from("scores").insert({
      user_id:user.id,
      score
    })
    load(user.id)
  }

  const subscribe = async () => {
    await supabase.from("subscriptions").insert({
      user_id:user.id,
      plan:"monthly",
      status:"active"
    })
    alert("Subscribed Successfully")
  }

  if(!user) return <p className="p-10">Loading...</p>

  return (
    <div className="min-h-screen p-10 bg-black text-white">

      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <button
        onClick={subscribe}
        className="bg-blue-500 px-4 py-2 rounded mb-4"
      >
        Subscribe
      </button>

      <button
        onClick={addScore}
        className="bg-green-500 px-4 py-2 rounded mb-6"
      >
        Add Score
      </button>

      <div className="grid grid-cols-2 gap-4">
        {scores.map(s=>(
          <div key={s.id} className="bg-gray-800 p-4 rounded-lg">
            Score: {s.score}
          </div>
        ))}
      </div>

    </div>
  )
}
