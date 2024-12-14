'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CorpusEntry {
  id: string
  topicName: string
  content: string
}

export default function CorpusPage() {
  const [corpus, setCorpus] = useState<CorpusEntry[]>([])

  useEffect(() => {
    async function fetchCorpus() {
      const response = await fetch('/api/corpus')
      const data = await response.json()
      setCorpus(data)
    }
    fetchCorpus()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Professional Corpus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {corpus.map((entry) => (
          <Card key={entry.id}>
            <CardHeader>
              <CardTitle>{entry.topicName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{entry.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

