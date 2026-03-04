const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/initiate-payment', (req, res) => {
    const { amount, currency } = req.body;

    console.log(`payment process started for ${amount} ${currency}.`)

    res.json({
        id: "tr_123456",
        checkout_url: "https://mock-data-gateway.com/pay/123456",
        status: "initiated"
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend runs on port ${PORT}.`));