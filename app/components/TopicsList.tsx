'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface Topic {
  id: string
  name: string
  questions: { id: string; content: string }[]
  responses: { id: string; content: string }[]
}

export function TopicsList({ userId }: { userId: string }) {
  const [topics, setTopics] = useState<Topic[]>([])
  const [responses, setResponses] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchTopics()
  }, [userId])

  const fetchTopics = async () => {
    try {
      const response = await fetch(`/api/topics?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setTopics(data.topics)
      } else {
        throw new Error('Failed to fetch topics')
      }
    } catch (error) {
      toast({
        title: "Error fetching topics",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const handleResponseChange = (questionId: string, content: string) => {
    setResponses(prev => ({ ...prev, [questionId]: content }))
  }

  const handleSubmitResponse = async (topicId: string, questionId: string) => {
    const content = responses[questionId]
    if (!content) return

    try {
      const response = await fetch('/api/response/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, topicId, questionId, content }),
      })
      if (response.ok) {
        toast({
          title: "Response submitted successfully",
          description: "Your response has been saved and analyzed.",
        })
        fetchTopics() // Refresh topics to show the new response
      } else {
        throw new Error('Failed to submit response')
      }
    } catch (error) {
      toast({
        title: "Error submitting response",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {topics.map(topic => (
        <Card key={topic.id}>
          <CardHeader>
            <CardTitle>{topic.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {topic.questions.map(question => (
              <div key={question.id} className="mb-4">
                <p className="mb-2">{question.content}</p>
                <Textarea
                  value={responses[question.id] || ''}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  placeholder="Your response..."
                  className="mb-2"
                />
                <Button onClick={() => handleSubmitResponse(topic.id, question.id)}>Submit Response</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

