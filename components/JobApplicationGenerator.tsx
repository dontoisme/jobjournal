'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'

const mockGeneratedResume = `
John Doe
Software Engineer

Summary:
Experienced software engineer with a strong background in full-stack development and team leadership. Proven track record of delivering high-quality projects and improving development processes.

Experience:
TechCorp - Senior Software Engineer
- Led the development of a mission-critical application, resulting in a 30% increase in efficiency
- Implemented agile methodologies, improving team productivity by 25%

StartupX - Team Lead
- Managed a team of 5 developers, successfully launching 3 major products
- Resolved conflicts and improved team communication, resulting in higher job satisfaction

Skills:
- Programming Languages: JavaScript, Python, Java
- Frameworks: React, Node.js, Django
- Project Management: Agile, Scrum
- Leadership: Team Building, Conflict Resolution
`

const mockGeneratedCoverLetter = `
Dear Hiring Manager,

I am excited to apply for the Senior Software Engineer position at InnovativeTech. With my extensive experience in software development and team leadership, I believe I would be a valuable asset to your organization.

At TechCorp, I led the development of a mission-critical application that significantly improved efficiency. I have a proven track record of implementing agile methodologies and improving development processes, which aligns well with InnovativeTech's focus on cutting-edge technologies and efficient workflows.

My experience as a Team Lead at StartupX has honed my leadership skills, allowing me to effectively manage teams and resolve conflicts. I am confident that these skills will contribute to the collaborative and innovative environment at InnovativeTech.

I am particularly excited about the opportunity to work on AI-driven solutions, as mentioned in the job description. My background in machine learning and data analysis makes me well-suited to contribute to these projects.

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can contribute to InnovativeTech's continued success.

Sincerely,
John Doe
`

export function JobApplicationGenerator({ userId }: { userId: string }) {
  const [jobDescription, setJobDescription] = useState('')
  const [generatedResume, setGeneratedResume] = useState('')
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000))

    setGeneratedResume(mockGeneratedResume)
    setGeneratedCoverLetter(mockGeneratedCoverLetter)
    setIsGenerating(false)

    toast({
      title: "Application generated successfully",
      description: "Your customized resume and cover letter are ready.",
    })
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
        <Button type="submit" disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Application'
          )}
        </Button>
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

