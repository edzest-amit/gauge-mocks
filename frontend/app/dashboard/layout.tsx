'use client'

import Link from 'next/link'
import { useAuth } from '../../context/auth-context'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {

  const { user, logout } = useAuth()

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* Sidebar */}

      <aside
        style={{
          width: 220,
          padding: 20,
          background: '#f4f4f4',
          borderRight: '1px solid #ddd'
        }}
      >

        <h3>Gauge</h3>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {user?.role === 'super_admin' && (
            <Link href="/dashboard/tenants">Tenants</Link>
          )}

          {user?.role === 'tenant_admin' && (
          <>
          <Link href="/dashboard/users">Users</Link>
          <Link href="/dashboard/knowledge">Knowledge</Link>
          </>
          )}

          <Link href="/dashboard">Dashboard</Link>

        </nav>

        <div style={{ marginTop: 30 }}>
          <button onClick={logout}>
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}

      <main style={{ flex: 1, padding: 30 }}>
        {children}
      </main>

    </div>
  )
}