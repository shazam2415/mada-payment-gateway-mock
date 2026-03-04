import axios from 'axios';

function App() {
    const handlePay = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/initiate-payment', {
                amount: 100,
                currency: 'SAR'
            });
            alert("Payment initiated! Redirected ID: " + res.data.id);
        } catch (err) {
            console.error("Hata:", err);
        }
    };

    return (
        <div>
            <h1>
                MADA PAYMENT TEST
            </h1>
            <button onClick={handlePay}>
                Pay 100 SAR
            </button>
        </div>
    );
}

export default App;