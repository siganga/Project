// AnswerChecker.js

 import { GoogleGenerativeAI } from "@google/generative-ai";

 // 
 const API_KEY = 'AIzaSyDMImaEK2B_weiWtKVmYo_iLOdna7XgCB8'; // 

 const AnswerChecker = async (question, userAnswer, correctAnswer) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // 

    const prompt = `Determine if the following user answer to the question "<span class="math-inline">\{question\}" is correct, even if it's not an exact match to the provided correct answer "</span>{correctAnswer}". Consider minor variations in punctuation, capitalization, and phrasing that still convey the same meaning. Respond with "true" if the user answer is correct or "false" if it is incorrect.

    User Answer: ${userAnswer}
    Correct Answer: ${correctAnswer}

    Is the user answer correct (true/false)?`;

    const result = await model.generateContent(prompt);
    const apiResponse = await result.response;
    console.error(apiResponse);
    const generatedText = apiResponse.text();

    if (generatedText && generatedText.toLowerCase().includes('true')) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error calling Gemini API for answer checking:', error);
    return false; // 
  }
 };

 export default AnswerChecker;