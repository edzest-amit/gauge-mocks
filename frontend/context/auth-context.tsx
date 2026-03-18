'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'
import { useRouter } from 'next/navigation'

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {

  const token = localStorage.getItem('token')

  if (!token) {
    setLoading(false)
    return
  }

  apiFetch('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(data => setUser(data))
    .catch(() => {
      localStorage.removeItem('token')
    })
    .finally(() => setLoading(false))

}, [])

  function logout() {
  localStorage.removeItem('token')
  document.cookie = 'token=; Max-Age=0; path=/'
  setUser(null)
  router.push('/login')}

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}