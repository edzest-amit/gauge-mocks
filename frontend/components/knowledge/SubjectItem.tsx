"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";
import TopicItem from "./TopicItem";

export default function SubjectItem({ subject }: any) {

  const [topics, setTopics] = useState<any[]>([]);
  const [topicName, setTopicName] = useState("");

  async function loadTopics() {
    const data = await apiFetch(`/knowledge/topics/${subject.id}`);
    setTopics(data);
  }

  async function createTopic(e: any) {

  e.preventDefault();

  if (!topicName) return;

  const payload = {
    subjectId: subject.id,
    name: topicName
  };

  console.log("Sending topic payload:", payload);

  await apiFetch("/knowledge/topics", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  setTopicName("");

  loadTopics();
}

  useEffect(() => {
    loadTopics();
  }, []);

  return (
    <div style={{ marginTop: "25px" }}>

      <h3>{subject.name}</h3>

      {/* Create Topic */}

      <form
        onSubmit={createTopic}
        style={{ marginLeft: "20px", marginTop: "10px" }}
      >

        <input
          placeholder="Topic name"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />

        <button style={{ marginLeft: "10px" }}>
          Add Topic
        </button>

      </form>

      {/* Topic List */}

      <div style={{ marginLeft: "40px", marginTop: "10px" }}>

        {topics.map((topic: any) => (
  <TopicItem
    key={topic.id}
    topic={topic}
  />
))}

      </div>

    </div>
  );
}