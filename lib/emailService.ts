import nodemailer from 'nodemailer'
import { generateQuestions } from './aiService'
import { getUserTopic, saveUserResponse } from './databaseService'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Configure nodemailer with your email service provider
const transporter = nodemailer.createTransport({
  // Add your email service configuration here
})

export async function sendTopicEmail(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error('User not found')
  
  const topic = await getUserTopic(userId)
  const questions = await generateQuestions(topic)

  const mailOptions = {
    from: '"Job Journal" <noreply@jobjournal.com>',
    to: user.email,
    subject: `Let's talk about your experience: ${topic.name}`,
    html: `
      <h1>Hi ${user.name},</h1>
      <p>We'd love to learn more about your experience with ${topic.name}. Could you please answer the following questions?</p>
      <ul>
        ${questions.map(q => `<li>${q}</li>`).join('')}
      </ul>
      <p>Simply reply to this email with your responses. Your insights will help create a more powerful resume and cover letter!</p>
    `
  }

  await transporter.sendMail(mailOptions)
}

export async function processIncomingEmail(email: any) {
  const userId = extractUserIdFromEmail(email)
  const response = extractResponseFromEmail(email)
  
  await saveUserResponse(userId, response)
}

function extractUserIdFromEmail(email: any) {
  // Implementation to extract user ID from email headers or content
}

function extractResponseFromEmail(email: any) {
  // Implementation to extract user's response from email body
}

