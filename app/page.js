"use client"
import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const signup = async () => {
    await supabase.from("users").insert({email,password})
    alert("User created")
  }

  const login = async () => {
    const {data}=await supabase.from("users")
      .select("*")
      .eq("email",email)
      .eq("password",password)
      .single()

    if(data){
      localStorage.setItem("user",JSON.stringify(data))
      window.location.href="/dashboard"
    } else {
      alert("Invalid login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[350px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Golf Charity
        </h1>

        <input
          className="w-full mb-3 p-2 rounded bg-black border border-gray-700"
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 rounded bg-black border border-gray-700"
          placeholder="Password"
          type="password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-green-500 hover:bg-green-600 p-2 rounded mb-2"
        >
          Login
        </button>

        <button
          onClick={signup}
          className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded"
        >
          Signup
        </button>

      </div>
    </div>
  )
}
