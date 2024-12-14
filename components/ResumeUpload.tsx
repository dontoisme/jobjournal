'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

export function ResumeUpload({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    setProgress(0)

    // Simulate file upload and processing
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    setUploading(false)
    setProgress(0)

    toast({
      title: "Resume uploaded successfully",
      description: "Your resume has been processed and topics have been generated.",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="resume">Upload Resume (PDF)</Label>
        <Input id="resume" type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
      </div>
      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">Processing resume... {progress}%</p>
        </div>
      )}
      <Button type="submit" disabled={!file || uploading}>
        {uploading ? 'Uploading...' : 'Upload Resume'}
      </Button>
    </form>
  )
}

