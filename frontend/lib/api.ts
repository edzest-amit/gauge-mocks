const API_BASE = 'http://localhost:3000'

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {

  const token = localStorage.getItem('token')

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  })

  if (!res.ok) {
  const text = await res.text()
  throw new Error(`API request failed: ${text}`)
}

  return res.json()
}