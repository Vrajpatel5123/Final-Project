import {rest} from '../composables/myFetch'

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export async function askGemini(prompt: string): Promise<string>{
    const modelName = 'gemini-2.0-flash'
    const url =  `"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key= ${GOOGLE_API_KEY}`

    const response = await rest<any>(url,{
        contents: [
            {
                parts: [
                    {
                        text: prompt,
                    },
                ],
            },
        ],
    })

    return response.candidates[0].content[0].text ?? ''
}