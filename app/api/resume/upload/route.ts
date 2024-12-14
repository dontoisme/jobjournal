import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { processResume } from '@/lib/resumeProcessor'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('resume') as File
    const userId = formData.get('userId') as string

    if (!file || !userId) {
      return NextResponse.json({ error: 'Missing file or user ID' }, { status: 400 })
    }

    const resumeContent = await file.text()

    // Save resume to database
    const resume = await prisma.resume.create({
      data: {
        userId,
        content: resumeContent,
      },
    })

    // Process resume to generate topics and questions
    await processResume(userId, resumeContent)

    return NextResponse.json({ 
      message: 'Resume uploaded and processed successfully',
      resumeId: resume.id
    }, { status: 201 })
  } catch (error) {
    console.error('Resume upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

