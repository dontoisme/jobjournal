import { NextResponse } from 'next/server'
import { processIncomingEmail } from '@/lib/emailService'

export async function POST(req: Request) {
  const emailData = await req.json()

  try {
    await processIncomingEmail(emailData)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing incoming email:', error)
    return NextResponse.json({ error: 'Failed to process email' }, { status: 500 })
  }
}

