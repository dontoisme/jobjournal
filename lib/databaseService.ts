import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUserTopic(userId: string) {
  const nextTopic = await prisma.topic.findFirst({
    where: { userId, responses: { none: {} } },
    orderBy: { order: 'asc' },
    include: { questions: true },
  })

  return nextTopic
}

export async function saveUserResponse(userId: string, topicId: string, questionId: string, content: string, analysis: string) {
  await prisma.response.create({
    data: {
      content,
      analysis,
      userId,
      topicId,
      questionId,
    },
  })
}

export async function updateUserEmailFrequency(userId: string, frequency: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { emailFrequency: frequency },
  })
}

// Add more database operations as needed

