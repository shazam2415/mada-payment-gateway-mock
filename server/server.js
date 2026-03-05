const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/initiate-payment', (req, res) => {

    const cardNumber = req.body.card;

    if (cardNumber.startsWith('4') || cardNumber.startsWith('5')) {
        res.json({
            state: "waiting_for_approval",
            message: "Please enter the 4-digit code sent to your phone.",
            test_code: "1234"
        });
    } else {
        res.status(400).json({ message: "Invalid mada card!" });
    }
});

app.post('/api/verify-code', (req, res) => {
    const codeReceived = req.body.code;

    if (codeReceived === "1234") {
        res.json({ message: "Payment Completed Successfully! Approval received from mada network." });
    } else {
        res.status(400).json({ message: "Invalid SMS code! Please try again." });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend runs on port ${PORT}.`));