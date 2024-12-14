import Queue from 'bull'
import { Redis } from 'ioredis'
import { sendTopicEmail } from './emailService'

const redis = new Redis(process.env.REDIS_URL)

export const emailQueue = new Queue('email-queue', {
  redis: {
    port: redis.options.port,
    host: redis.options.host,
    password: redis.options.password,
  },
})

export async function scheduleEmail(userId: string, delay: number) {
  await emailQueue.add(
    'send-topic-email',
    { userId },
    { delay, attempts: 3, backoff: { type: 'exponential', delay: 60000 } }
  )
}

emailQueue.process('send-topic-email', async (job) => {
  const { userId } = job.data
  await sendTopicEmail(userId)
})

// Add more queue processors for other email types as needed

