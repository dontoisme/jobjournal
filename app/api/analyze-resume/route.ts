import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('resume') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  // Here you would:
  // 1. Use an AI service to analyze the resume
  // 2. Extract distinct topics
  // 3. Generate a sorted list of topics
  // 4. Create initial questions for each topic

  // For now, we'll return some mock data
  const topics = [
    { id: 1, name: 'Software Engineer at Tech Co', questions: ['How did you start at Tech Co?', 'What was your biggest achievement?'] },
    { id: 2, name: 'Project X at StartUp Inc', questions: ['What was Project X about?', 'What challenges did you face?'] },
    { id: 3, name: 'Volunteer Work at Non-Profit Org', questions: ['What inspired you to volunteer?', 'How did this experience impact your career?'] },
  ]

  return NextResponse.json({ topics })
}

