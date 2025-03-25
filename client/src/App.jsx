import { useState } from 'react';
import './styles.css';

export default function App() {
  const [subject, setSubject] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePrompt = async () => {
    if (!subject.trim()) {
      setError('অনুগ্রহ করে একটি সাবজেক্ট লিখুন');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      setPrompt(data.prompt);
    } catch (err) {
      setError('প্রম্পট জেনারেট করতে সমস্যা হয়েছে');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt)
      .then(() => alert('প্রম্পট কপি করা হয়েছে!'))
      .catch(err => console.error('কপি করতে ব্যর্থ: ', err));
  };

  return (
    <div className="container">
      <h1>AI প্রম্পট জেনারেটর</h1>
      
      <div className="input-group">
        <label htmlFor="subject">সাবজেক্ট লিখুন:</label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="যেমন: ভূত, সুন্দর সূর্যাস্ত, ভয়ঙ্কর ড্রাগন"
        />
      </div>
      
      <button onClick={generatePrompt} disabled={loading}>
        {loading ? 'প্রসেস হচ্ছে...' : 'প্রম্পট জেনারেট করুন'}
      </button>
      
      {error && <div className="error">{error}</div>}
      
      {prompt && (
        <div className="output-group">
          <label htmlFor="prompt">জেনারেটেড প্রম্পট:</label>
          <textarea id="prompt" value={prompt} readOnly />
          <button className="copy-btn" onClick={copyPrompt}>
            প্রম্পট কপি করুন
          </button>
        </div>
      )}
    </div>
  );
}
