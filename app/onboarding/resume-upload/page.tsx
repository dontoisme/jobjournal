'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResumeUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      // Here you would typically upload the file to your backend
      console.log('File to upload:', file)
      // For now, we'll just redirect to the next onboarding step
      router.push('/onboarding/question-frequency')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Your Resume</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="resume">Resume (PDF)</Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={!file}>
            Upload and Continue
          </Button>
        </div>
      </form>
    </div>
  )
}

