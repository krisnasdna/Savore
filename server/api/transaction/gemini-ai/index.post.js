import { GoogleGenAI } from '@google/genai'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)
    const genAI = new GoogleGenAI({apiKey: config.geminiSecretKey})

    const categoryList = body.category.map((cat) => `- ${cat.name} (id:${cat.id})`).join('\n')
    const result = await genAI.models.generateContent({
        model: 'gemini-2.5-flash-lite-preview-06-17',
        contents: [
        {
            role: 'user',
            parts: [
            {
                inlineData: {
                mimeType: 'image/jpeg', 
                data: body.image, 
                },
            },
            {
                text:`
                    Analyze this receipt image and extract the following information in JSON format:
                    - Total amount (just the number)

                    - Date (in ISO format)

                    - Description or items purchased (brief summary)

                    -  Suggested category based on list below
                    
                    Here is the list of valid category:
                    (${categoryList})

                    Only respond with valid JSON in this exact format:

                    {

                    "amount": number,

                    "date": "ISO date string",

                    "description": "string",

                    "categoryId": "uuid from the list category"

                    }
                    If its not a recipt, return an empty object`,
            },
            ],
        },
        ],
    })

    const text = result.text
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const data = JSON.parse(cleanedText)

    return data
})
