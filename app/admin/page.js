"use client"
import { supabase } from "../../lib/supabase"

export default function Admin() {

  const runDraw = async () => {
    const numbers = Array.from({length:5},()=>Math.floor(Math.random()*45)+1)

    await supabase.from("draws").insert({numbers})

    alert("Draw Created")
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={runDraw}>Run Draw</button>
    </div>
  )
}