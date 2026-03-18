'use client'

import { useEffect, useState } from 'react'
import { apiFetch } from '../../../lib/api'

export default function TenantsPage() {

  const [tenants, setTenants] = useState<any[]>([])
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  async function loadTenants() {
    const data = await apiFetch('/tenants')
    setTenants(data)
  }

  useEffect(() => {
    loadTenants()
  }, [])

  function handleNameChange(e: any) {
    const value = e.target.value
    setName(value)
    setSlug(generateSlug(value))
  }

  async function createTenant(e: any) {
    e.preventDefault()

    if (!name || !slug) {
      alert('Tenant name required')
      return
    }

    setLoading(true)

    try {

      await apiFetch('/tenants', {
        method: 'POST',
        body: JSON.stringify({ name, slug, adminEmail, adminPassword })
      })

      setName('')
      setSlug('')
      setAdminEmail('')
      setAdminPassword('')
      

      loadTenants()

    } catch (err:any) {

      alert(err.message || 'Tenant creation failed')

    }

    setLoading(false)
  }




  return (
    <div>

      <h1>Tenants</h1>

      <table style={{ marginBottom: 30 }}>
  <thead>
    <tr>
      <th>Name</th>
      <th>Slug</th>
      <th>Admin Email</th>
      <th>Created</th>
    </tr>
  </thead>

  <tbody>
    {tenants.map((t:any) => {

      const admin = t.users?.find(
        (u:any) =>
          u.user_roles?.some(
            (r:any) => r.role.name === 'tenant_admin'
          )
      )

      return (
        <tr key={t.id}>
          <td>{t.name}</td>
          <td>{t.slug}</td>
          <td>{admin?.email || '-'}</td>
          <td>{new Date(t.created_at).toLocaleDateString()}</td>
        </tr>
      )
    })}
  </tbody>
</table>

      <h2>Create Tenant</h2>

      <form onSubmit={createTenant}>

        <div>
          <input
            placeholder="Tenant Name"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <input
            placeholder="Slug"
            value={slug}
            onChange={(e)=>setSlug(e.target.value)}
          />
        </div>

        <div>
          <input
          placeholder="Admin Email"
          value={adminEmail}
          onChange={(e)=>setAdminEmail(e.target.value)}
          />
        </div>

        <div>
          <input
          type="password"
          placeholder="Admin Password"
          value={adminPassword}
          onChange={(e)=>setAdminPassword(e.target.value)}
          />
        </div>

        <button disabled={loading} style={{ marginTop: 20 }}>
          {loading ? 'Creating...' : 'Create Tenant'}
        </button>

      </form>

    </div>
  )
}