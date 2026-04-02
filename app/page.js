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

    if(data) localStorage.setItem("user",JSON.stringify(data))
  }

  return (
    <div>
      <h1>Golf App</h1>
      <input placeholder="email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={signup}>Signup</button>
      <button onClick={login}>Login</button>
    </div>
  )
}