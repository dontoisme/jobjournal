import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const topics = await prisma.topic.findMany({
      where: { userId },
      include: {
        questions: true,
        responses: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ topics }, { status: 200 })
  } catch (error) {
    console.error('Error fetching topics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

