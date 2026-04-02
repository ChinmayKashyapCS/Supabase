"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Dashboard() {
  const [scores,setScores]=useState([])
  const [user,setUser]=useState(null)

  useEffect(()=>{
    const storedUser = localStorage.getItem("user")
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
  },[])

  const addScore = async () => {
    if(!user) return
    const score = prompt("Enter score (1-45)")

    await supabase.from("scores").insert({
      user_id:user.id,
      score
    })
    load(user.id)
  }

  const load = async (uid) => {
    const {data}=await supabase.from("scores")
      .select("*")
      .eq("user_id",uid)
      .order("created_at",{ascending:false})
      .limit(5)

    setScores(data || [])
  }

  useEffect(()=>{
    if(user){
      load(user.id)
    }
  },[user])

  if(!user) return <p>Loading...</p>

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={addScore}>Add Score</button>

      {scores.map(s=>(
        <p key={s.id}>{s.score}</p>
      ))}
    </div>
  )
}
