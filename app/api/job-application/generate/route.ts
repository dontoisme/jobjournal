import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { generateCustomizedApplication } from '@/lib/aiService'

export async function POST(req: Request) {
  try {
    const { userId, jobDescription } = await req.json()

    if (!userId || !jobDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Fetch user's corpus
    const userCorpus = await prisma.corpus.findMany({
      where: { userId },
      select: { content: true },
    })

    const corpusContent = userCorpus.map(entry => entry.content).join('\n\n')

    // Generate customized resume and cover letter
    const { resumeContent, coverLetter } = await generateCustomizedApplication(corpusContent, jobDescription)

    // Save the job application
    const jobApplication = await prisma.jobApplication.create({
      data: {
        userId,
        companyName: 'To be filled', // This could be extracted from the job description if needed
        position: 'To be filled', // This could be extracted from the job description if needed
        description: jobDescription,
        resumeContent,
        coverLetter,
      },
    })

    return NextResponse.json({ 
      message: 'Job application generated successfully',
      applicationId: jobApplication.id,
      resumeContent,
      coverLetter
    }, { status: 201 })
  } catch (error) {
    console.error('Error generating job application:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

