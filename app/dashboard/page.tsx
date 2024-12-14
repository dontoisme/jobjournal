'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const [jobDescription, setJobDescription] = useState('')
  const [generatedResume, setGeneratedResume] = useState('')
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('')

  const handleJobDescriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would call your AI service to generate the resume and cover letter
    // For now, we'll just set some placeholder text
    setGeneratedResume('This is your AI-generated resume...')
    setGeneratedCoverLetter('This is your AI-generated cover letter...')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Job Journal Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Next Topic: Project X at Company Y</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You'll receive an email soon asking about this project. Keep an eye on your inbox!</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Corpus Building Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You've completed 5 out of 10 topics. Great progress!</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleJobDescriptionSubmit} className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Generate Custom Application</h2>
        <Textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="mb-4"
          rows={6}
        />
        <Button type="submit">Generate Resume & Cover Letter</Button>
      </form>

      {generatedResume && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Generated Resume</h3>
          <Textarea value={generatedResume} rows={10} readOnly className="mb-2" />
          <Button>Download PDF</Button>
          <Button className="ml-2">Edit</Button>
        </div>
      )}

      {generatedCoverLetter && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Generated Cover Letter</h3>
          <Textarea value={generatedCoverLetter} rows={10} readOnly className="mb-2" />
          <Button>Download PDF</Button>
          <Button className="ml-2">Edit</Button>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4">Previous Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ApplicationCard company="Tech Co" position="Software Engineer" date="2023-06-15" />
          <ApplicationCard company="StartUp Inc" position="Product Manager" date="2023-06-10" />
          <ApplicationCard company="Big Corp" position="Data Analyst" date="2023-06-05" />
        </div>
      </div>
    </div>
  )
}

function ApplicationCard({ company, position, date }: { company: string; position: string; date: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{position}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{company}</p>
        <p>Applied: {date}</p>
        <Button className="mt-2">View Details</Button>
      </CardContent>
    </Card>
  )
}

