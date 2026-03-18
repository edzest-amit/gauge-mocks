'use client'

import { useAuth } from '../../context/auth-context'

export default function DashboardHome() {

  const { user } = useAuth()

  return (
    <div>

      <h1>Dashboard</h1>

      <p>Welcome {user?.email}</p>

      <p>Your role: {user?.role}</p>

    </div>
  )
}