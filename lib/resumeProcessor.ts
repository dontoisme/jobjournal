import { PrismaClient } from '@prisma/client'
import { generateTopicsFromResume, generateQuestionsForTopic } from './aiService'

const prisma = new PrismaClient()

export async function processResume(userId: string, resumeText: string): Promise<void> {
  const topics = await generateTopicsFromResume(resumeText)

  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i]
    const questions = await generateQuestionsForTopic(topic, resumeText)

    await prisma.topic.create({
      data: {
        name: topic,
        order: i,
        userId: userId,
        questions: {
          create: questions.map(q => ({ content: q }))
        }
      }
    })
  }
}

