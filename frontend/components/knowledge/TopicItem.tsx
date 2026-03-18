"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

export default function TopicItem({ topic }: any) {

  const [concepts, setConcepts] = useState<any[]>([]);
  const [conceptName, setConceptName] = useState("");

  async function loadConcepts() {

    const data = await apiFetch(`/knowledge/concepts/${topic.id}`);
    setConcepts(data);

  }

  async function createConcept(e:any){

  e.preventDefault();

  if(!conceptName) return;

  await apiFetch("/knowledge/concepts",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      topicId:topic.id,
      name:conceptName
    })
  });

  setConceptName("");

  loadConcepts();
}

  useEffect(()=>{
    loadConcepts();
  },[])

  return (
    <div style={{ marginTop: "10px", marginLeft: "20px" }}>

      <strong>{topic.name}</strong>

      {/* Create Concept */}

      <form onSubmit={createConcept} style={{ marginTop: "5px" }}>

        <input
          placeholder="Concept name"
          value={conceptName}
          onChange={(e)=>setConceptName(e.target.value)}
        />

        <button style={{ marginLeft: "10px" }}>
          Add Concept
        </button>

      </form>

      {/* Concept List */}

      <div style={{ marginLeft: "20px", marginTop: "5px" }}>

        {concepts.map((concept:any)=>(
          <div key={concept.id}>
            {concept.name}
          </div>
        ))}

      </div>

    </div>
  );
}