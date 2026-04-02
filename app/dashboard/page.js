"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Dashboard() {
  const [scores,setScores]=useState([])
  const user = JSON.parse(localStorage.getItem("user"))

  const addScore = async () => {
    const score = prompt("Enter score (1-45)")
    await supabase.from("scores").insert({
      user_id:user.id,
      score
    })
    load()
  }

  const load = async () => {
    const {data}=await supabase.from("scores")
      .select("*")
      .eq("user_id",user.id)
      .order("created_at",{ascending:false})
      .limit(5)

    setScores(data)
  }

  useEffect(()=>{load()},[])

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