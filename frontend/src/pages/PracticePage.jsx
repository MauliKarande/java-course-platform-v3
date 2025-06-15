import React, { useState } from 'react';
import axios from 'axios';

function PracticePage() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleRun = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/code/run', {
        code: code,
        language: 'java'
      });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Run error:', error);
      setOutput('Error running code');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Run Java Code</h2>
      <textarea
        rows="12"
        cols="70"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your Java code here..."
      ></textarea>
      <br />
      <button onClick={handleRun}>Run</button>
      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
}

export default PracticePage;
