import { NextResponse } from 'next/server'
import { processResume } from '@/lib/resumeProcessor'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('resume') as File
  const userId = formData.get('userId') as string

  if (!file || !userId) {
    return NextResponse.json({ error: 'Missing file or user ID' }, { status: 400 })
  }

  try {
    const resumeText = await file.text()
    await processResume(userId, resumeText)
    return NextResponse.json({ success: true, message: 'Resume processed successfully' })
  } catch (error) {
    console.error('Error processing resume:', error)
    return NextResponse.json({ error: 'Failed to process resume' }, { status: 500 })
  }
}

