'use client'

import { useState } from 'react'
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

const sampleTopics: Topic[] = [
  {
    id: '1',
    name: 'Software Development at TechCorp',
    questions: [
      { id: 'q1', content: 'What was your most challenging project at TechCorp?' },
      { id: 'q2', content: 'How did you contribute to improving the development process?' },
    ],
    responses: [],
  },
  {
    id: '2',
    name: 'Team Leadership at StartupX',
    questions: [
      { id: 'q3', content: 'Describe a situation where you had to resolve a conflict within your team.' },
      { id: 'q4', content: 'What strategies did you use to motivate your team members?' },
    ],
    responses: [],
  },
  {
    id: '3',
    name: 'Project Management Skills',
    questions: [
      { id: 'q5', content: 'Tell me about a time when you had to manage multiple projects simultaneously.' },
      { id: 'q6', content: 'How do you prioritize tasks when working on a complex project?' },
    ],
    responses: [],
  },
]

export function TopicsList({ userId }: { userId: string }) {
  const [topics, setTopics] = useState<Topic[]>(sampleTopics)
  const [responses, setResponses] = useState<Record<string, string>>({})

  const handleResponseChange = (questionId: string, content: string) => {
    setResponses(prev => ({ ...prev, [questionId]: content }))
  }

  const handleSubmitResponse = async (topicId: string, questionId: string) => {
    const content = responses[questionId]
    if (!content) return

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setTopics(prevTopics => 
      prevTopics.map(topic => 
        topic.id === topicId 
          ? {
              ...topic,
              responses: [...topic.responses, { id: `r${Date.now()}`, content }]
            }
          : topic
      )
    )

    setResponses(prev => ({ ...prev, [questionId]: '' }))

    toast({
      title: "Response submitted successfully",
      description: "Your response has been saved and analyzed.",
    })
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
            {topic.responses.map(response => (
              <div key={response.id} className="mt-4 p-2 bg-muted rounded">
                <p className="font-semibold">Your response:</p>
                <p>{response.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

