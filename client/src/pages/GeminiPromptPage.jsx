import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function GeminiPromptPage() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Replace with your actual API key
  const API_KEY = 'AIzaSyCEazmFuhYFPTPGb02tlXRynEo7dH_nGa8';

  // Encoded prompt (replace with your desired prompt)
  const encodedPrompt = btoa("Write a sonnet about a programmers life, but also make it rhyme.");

  useEffect(() => {
    const runGemini = async () => {
      setIsLoading(true);
      setResponse('');
      setError('');

      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Decode the prompt
        const prompt = atob(encodedPrompt);

        const result = await model.generateContent(prompt);
        const apiResponse = await result.response;
        const generatedText = apiResponse.text();

        if (generatedText) {
          setResponse(generatedText);
        } else {
          setResponse('No response received from Gemini.');
        }
      } catch (err) {
        console.error('Error calling Gemini API:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    runGemini();
  }, [encodedPrompt, API_KEY]); // Re-run if prompt or API key changes

  return (
    <div className='z-10'>
      <h1>Gemini API Response</h1>
      {isLoading && <p>Loading response...</p>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {response && (
        <div>
          <h2>Generated Content:</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}

export default GeminiPromptPage;