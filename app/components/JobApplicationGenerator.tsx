'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function JobApplicationGenerator({ userId }: { userId: string }) {
  const [jobDescription, setJobDescription] = useState('')
  const [generatedResume, setGeneratedResume] = useState('')
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/job-application/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, jobDescription }),
      })
      const data = await response.json()
      if (response.ok) {
        setGeneratedResume(data.resumeContent)
        setGeneratedCoverLetter(data.coverLetter)
        toast({
          title: "Application generated successfully",
          description: "Your customized resume and cover letter are ready.",
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          rows={6}
        />
        <Button type="submit">Generate Application</Button>
      </form>
      {generatedResume && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Generated Resume</h3>
          <Textarea value={generatedResume} rows={10} readOnly />
        </div>
      )}
      {generatedCoverLetter && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Generated Cover Letter</h3>
          <Textarea value={generatedCoverLetter} rows={10} readOnly />
        </div>
      )}
    </div>
  )
}

