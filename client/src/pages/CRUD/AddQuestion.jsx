import { motion } from "framer-motion";
//import UnitsPage from "./UnitsPage";
//<UnitsPage />

//import UnitAdd from "./CRUD/UnitAdd";         <UnitAdd />

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';






const AddQuestion = () => {

   const { lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionAnswer, setNewQuestionAnswer] = useState('');
  const [lessonTitle, setLessonTitle] = useState(''); // Store lesson title

  useEffect(() => {
    // Fetch questions for the lesson
    fetch(`http://localhost:5000/api/questions/lesson/${lessonId}`)
      .then(res => res.json())
      .then(data => setQuestions(data));

    // Fetch the lesson title (for display)
    fetch(`http://localhost:5000/api/lessons/${lessonId}`) // Assuming you have this route on your backend
      .then(res => res.json())
      .then(lessonData => setLessonTitle(lessonData.title));
  }, [lessonId]);

  const handleAddQuestion = () => {
    fetch('http://localhost:5000/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: newQuestionText,
        answer: newQuestionAnswer,
        lessonId
      })
    })
      .then(res => res.json())
      .then(newQuestion => setQuestions([...questions, newQuestion]));
        setNewQuestionText("")
        setNewQuestionAnswer("")
  };

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:5000/api/questions/${id}`, { method: 'DELETE' })
      .then(() => setQuestions(questions.filter(question => question._id !== id)));
  };



  return (
    <div className='flex-1 overflow-auto relative z-10'>
      

      
        <p> Add Question Page  </p>

        <h1>{lessonTitle} - Add Question</h1> {/* Display lesson title */}
      <input
        type="text"
        value={newQuestionText}
        onChange={e => setNewQuestionText(e.target.value)}
        placeholder="Question Text"
      />
      <input
        type="text"
        value={newQuestionAnswer}
        onChange={e => setNewQuestionAnswer(e.target.value)}
        placeholder="Question Answer"
      />
      <button onClick={handleAddQuestion}>Add Question</button>

      <h2>Questions</h2>
      <ul>
        {questions.map(question => (
          <li key={question._id}>
            {question.text} - {question.answer}
            <button onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to={`/add-lesson/${questions[0]?.lesson}`}> {/* Go back to the correct lesson */}
        <button>Back to Lessons</button>
      </Link>
       
        

    </div>
  );
};
export default AddQuestion;