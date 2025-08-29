// ExplanationModal.js
import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function ExplanationModal({ isOpen, onClose, question, answer }) {
  const [explanation, setExplanation] = useState('');
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [error, setError] = useState(null);

  
  const API_KEY = 'AIzaSyCEazmFuhYFPTPGb02tlXRynEo7dH_nGa8';
  useEffect(() => {
    const fetchExplanation = async () => {
      if (isOpen && question && answer) {
        setLoadingExplanation(true);
        setError(null);
        setExplanation('');

        try {
          const genAI = new GoogleGenerativeAI(API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 

          const prompt = `Explain why the correct answer to the question "${question}" is "${answer}". Provide a concise explanation.`;

          const result = await model.generateContent(prompt);
          const apiResponse = await result.response;
          const generatedText = apiResponse.text();

          if (generatedText) {
            setExplanation(generatedText);
          } else {
            setExplanation('No explanation received.');
          }
        } catch (err) {
          console.error('Error calling Gemini API for explanation:', err);
          setError(err.message);
          setExplanation('Failed to load explanation.');
        } finally {
          setLoadingExplanation(false);
        }
      } else {
        setExplanation('');
        setError(null);
      }
    };

    fetchExplanation();
  }, [isOpen, question, answer, API_KEY]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-4/5 max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-black">Explanation</h2>
        <p className="mb-2 text-black">
          <strong>Question:</strong> {question}
        </p>
        <p className="mb-2  text-black ">
          <strong>Correct Answer:</strong> {answer}
        </p>
        {loadingExplanation && <p>Loading explanation...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {explanation && <pre className="whitespace-pre-wrap text-black ">{explanation}</pre>}
        <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4">
          Close
        </button>
      </div>
    </div>
  );
}

export default ExplanationModal;