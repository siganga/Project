import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// Lesson Component (Dynamic Form from previous example, slightly modified)
function LessonPage() {
  const { lessonId } = useParams(); // Get lessonId from URL
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [incorrectAnswers, setIncorrectAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/lessons/${lessonId}`); // Fetch questions for specific lesson
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching questions:", err)
      }
    };

    fetchQuestions();
  }, [lessonId]); // Add lessonId to dependency array


 
  const handleInputChange = (questionId, event) => {
    setUserAnswers({ ...userAnswers, [questionId]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const incorrect = {};
    questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      const correctAnswer = question.answer; // Assuming 'answer' is the correct answer from the server.
      if (userAnswer !== correctAnswer) {
        incorrect[question.id] = true;
      }
    });
    setIncorrectAnswers(incorrect);
  };

 
  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {questions.map(question => (
        <div key={question.id} className={`question-container ${submitted && incorrectAnswers[question.id] ? 'incorrect' : ''}`}>
          <label htmlFor={question.id}>{question.text}</label> {/* Use question.text from server */}
          <input
            type="text" // Or appropriate input type based on question.type from server
            id={question.id}
            value={userAnswers[question.id] || ''}
            onChange={(event) => handleInputChange(question.id, event)}
          />
          {submitted && incorrectAnswers[question.id] && (
            <div className="error-message">Incorrect!</div>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

