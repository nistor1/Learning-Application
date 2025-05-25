const express = require('express');
const axios = require('axios');
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/ask', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: message
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const reply = response.data.candidates[0].content.parts[0].text;
        res.json({ reply });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: 'Error from Gemini API', error: error.response?.data || error.message });
    }
});

module.exports = router;
