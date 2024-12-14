'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export function ResumeUpload({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('resume', file)
    formData.append('userId', userId)

    try {
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (response.ok) {
        toast({
          title: "Resume uploaded successfully",
          description: "Your resume has been processed and topics have been generated.",
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="resume">Upload Resume (PDF)</Label>
        <Input id="resume" type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
      </div>
      <Button type="submit" disabled={!file}>Upload Resume</Button>
    </form>
  )
}

