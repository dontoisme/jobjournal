import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function generateQuestions(topic: string, context: string): Promise<string[]> {
  const prompt = `Given the topic "${topic}" and the following context about the user's experience:\n\n${context}\n\nGenerate 3 insightful questions to ask the user about this topic.`

  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 150,
    n: 3,
    stop: null,
    temperature: 0.7,
  })

  return response.data.choices.map(choice => choice.text.trim())
}

export async function analyzeResponse(topic: string, question: string, response: string): Promise<string> {
  const prompt = `Given the topic "${topic}", the question "${question}", and the user's response:\n\n${response}\n\nProvide a brief analysis of the key points and how they could be used to enhance a resume or cover letter.`

  const aiResponse = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 200,
    n: 1,
    stop: null,
    temperature: 0.5,
  })

  return aiResponse.data.choices[0].text.trim()
}

