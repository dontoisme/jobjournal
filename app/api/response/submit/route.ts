import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { analyzeResponse, updateUserCorpus } from '@/lib/aiService'

export async function POST(req: Request) {
  try {
    const { userId, topicId, questionId, content } = await req.json()

    if (!userId || !topicId || !questionId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Analyze the response
    const analysis = await analyzeResponse(topicId, questionId, content)

    // Save the response
    const response = await prisma.response.create({
      data: {
        userId,
        topicId,
        questionId,
        content,
        analysis,
      },
    })

    // Update the user's corpus
    await updateUserCorpus(userId)

    return NextResponse.json({ 
      message: 'Response submitted successfully',
      responseId: response.id
    }, { status: 201 })
  } catch (error) {
    console.error('Error submitting response:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

