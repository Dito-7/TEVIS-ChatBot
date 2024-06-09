import axios from 'axios';
import { apiKey } from '../constants'; // Ensure you have your apiKey defined

const client = axios.create({
    baseURL: 'https://api.groq.com/openai/v1/models', // Base URL
    headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    },
});

const groqModelEndpoint = 'https://api.groq.com/openai/v1/chat/completions'; // Adjust endpoint as necessary

export const apiCall = async (prompt) => {
    try {
        const res = await client.post(groqModelEndpoint, {
            model: 'llama3-8b-8192', // Replace with your Groq model ID
            messages: [
                { role: 'system', content: 'you are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            stop: null,
            stream: false,
        });

        console.log('API Response:', res.data); // Log the response data
        return { success: true, data: res.data }; // Return success and data
    } catch (err) {
        console.error('Error calling Groq API:', err.response ? err.response.data : err.message); // Print the error response
        return { success: false, msg: err.message }; // Return error state
    }
};
