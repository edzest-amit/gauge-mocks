'use client'

import { useEffect,useState } from 'react'
import { apiFetch } from '../../../lib/api'
import SubjectItem from '@/components/knowledge/SubjectItem'

export default function KnowledgePage(){

  const [subjects,setSubjects] = useState([])
  const [name,setName] = useState('')

  async function loadSubjects(){
    const data = await apiFetch('/knowledge/subjects')
    setSubjects(data)
  }

  useEffect(()=>{
    loadSubjects()
  },[])

  async function createSubject(e:any){
    e.preventDefault()

    await apiFetch('/knowledge/subjects',{
      method:'POST',
      body:JSON.stringify({ name })
    })

    setName('')
    loadSubjects()
  }

  return (
    <div>

      <h1>Knowledge Structure</h1>

      <form onSubmit={createSubject}>

        <input
          placeholder="Subject name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <button>Add Subject</button>

      </form>

      <div style={{marginTop:30}}>

        {subjects.map((subject:any)=>(
          <SubjectItem
            key={subject.id}
            subject={subject} token={undefined}          />
        ))}

      </div>

    </div>
  )
}