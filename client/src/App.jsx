import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [step, setStep] = useState(1); // 1 ile başlıyoruz
  const [cardNo, setCardNo] = useState('');
  const [smsCode, setSmsCode] = useState('');

  const sendCard = async () => {

    if (cardNo.length !== 16) {
    alert("Hata: mada kart numarası tam 16 hane olmalıdır!");
    return; // 'return' burada "aşağıdaki kodlara geçme, fonksiyonu burada bitir" demek.
  }

  // 2. Bekçi Kontrolü: Sadece rakam mı girilmiş? (Opsiyonel meraklısı için)
  if (isNaN(cardNo)) {
    alert("Hata: Kart numarası sadece rakamlardan oluşmalıdır!");
    return;
  }

    try {
      const res = await axios.post('http://localhost:5000/api/initiate-payment', { card: cardNo });
      
      // Eğer backend "onay_bekliyor" dediyse adımı 2 yap
      if (res.data.state === "waiting_for_approval") {
        setStep(2); 
      }
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  };

  const verifyCode = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/verify-code', { 
            code: smsCode
        });

        alert(res.data.message);
        setStep(3); 
    } catch (err) {
        alert("ERROR: " + err.response.data.message);
    }
};

  return (
    <div className='main' style={{ padding: '30px' }}>
      <h1>Mada Payment System</h1>

      {/* ADIM 1: KART GİRİŞİ */}
      {step === 1 && (
        <div>
          <input 
            placeholder="Card Number" 
            onChange={(e) => setCardNo(e.target.value)} 
          />
          <p>Card no: {cardNo}</p>
          <button onClick={sendCard}>Continue</button>
        </div>
      )}

      {/* ADIM 2: SMS KODU GİRİŞİ */}
      {step === 2 && (
        <div>
          <p>Enter the code sent to your phone:</p>
          <input 
            placeholder="SMS Code" 
            onChange={(e) => setSmsCode(e.target.value)} 
          />
          <button className='verify' onClick={verifyCode}>Verify</button>
        </div>
      )}
    </div>
  );
}

export default App;