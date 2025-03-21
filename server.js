const express = require('express');
const bodyParser = require('body-parser');
const { createPDF } = require('./pdfGenerator'); // Assuming pdfGenerator.js will handle PDF creation

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/generate-pdf', async (req, res) => {
    const { html, filename } = req.body;

    try {
        const pdfBuffer = await createPDF(html);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}"`,
        });
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
