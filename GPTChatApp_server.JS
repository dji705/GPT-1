const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 150
            })
        });

        const data = await response.json();
        const reply = data.choices[0].text.trim();
        res.json({ reply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing request');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});