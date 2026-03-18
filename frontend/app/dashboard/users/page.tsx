'use client'

import { useEffect, useState } from 'react'
import { apiFetch } from '../../../lib/api'
import { useAuth } from '../../../context/auth-context'

export default function UsersPage(){

  const { user } = useAuth()

  const [users,setUsers] = useState([])
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [role,setRole] = useState('teacher')

  async function loadUsers(){
    const data = await apiFetch('/users')
    setUsers(data)
  }

  useEffect(()=>{
    loadUsers()
  },[])

  async function createUser(e:any){
    e.preventDefault()

    await apiFetch('/users',{
  method:'POST',
  body:JSON.stringify({
    email,
    password,
    role
  })
})

    setEmail('')
    setPassword('')

    loadUsers()
  }

  return (
    <div>

      <h1>Users</h1>

      <ul>
        {users.map((u:any)=>(
          <li key={u.id}>
            {u.email} — {u.user_roles[0]?.role.name}
          </li>
        ))}
      </ul>

      <h2>Create User</h2>

      <form onSubmit={createUser}>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        >
          <option value="tenant_admin">Tenant Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>

        <button>Create User</button>

      </form>

    </div>
  )
}