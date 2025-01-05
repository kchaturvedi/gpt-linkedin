import { NextResponse } from 'next/server'

export const config = { runtime: 'edge' }

const handler = async (req) => {
  const { input, mood = 'typical' } = await req.json()

  const prompt = `Write a ${mood} LinkedIn post based on the following prompt that exaggerates achievements, no matter how small. Fill with emotion, but maintain professional tone. Elaborate on inspiration for this achievement. In a separate paragraph, include a separate paragraph on how others can achieve this too. Be sure to include hashtags at the end. Use this prompt: ${input}`

  const payload = {
    model: process.env.OPENAI_MODEL_NAME,
    messages: [{ role: 'user', content: prompt }],
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS ? parseInt(process.env.AI_MAX_TOKENS) : 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }

  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: requestHeaders,
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (data.error) {
    console.error('OpenAI API error: ', data.error)
    return NextResponse.json({
      text: `ERROR with API integration. ${data.error.message}`,
    })
  }

  return NextResponse.json({ text: data.choices[0].message.content.split('\n') })
}

export default handler
