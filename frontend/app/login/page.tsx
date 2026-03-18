'use client'

import { useState } from 'react'
import { apiFetch } from '../../lib/api'
import { useRouter } from 'next/navigation'

export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
   })

    const token = data.access_token

localStorage.setItem('token', token)
document.cookie = `token=${token}; path=/`

const profile = await apiFetch('/auth/me', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

    const role = profile.user_roles[0]?.role.name

    if (role === 'super_admin') {
    router.push('/dashboard/tenants')
    } else if (role === 'tenant_admin') {
    router.push('/dashboard/users')
    } else {
    router.push('/dashboard')
    }

    
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <div>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={{ marginTop: 20 }}>
          Login
        </button>

      </form>
    </div>
  )
}