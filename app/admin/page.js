"use client"
import { supabase } from "../../lib/supabase"

export default function Admin() {

  const runDraw = async () => {
    const numbers = Array.from({length:5},()=>Math.floor(Math.random()*45)+1)
    await supabase.from("draws").insert({numbers})
    alert("Draw Created")
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <button
        onClick={runDraw}
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        Run Draw
      </button>

    </div>
  )
}
