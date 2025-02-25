import { motion } from "framer-motion";
//import UnitsPage from "./UnitsPage";
//<UnitsPage />

//import UnitAdd from "./CRUD/UnitAdd";         <UnitAdd />

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';






const LessonPage = () => {

   const { unitId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [unitTitle, setUnitTitle] = useState(''); // Store the unit title

  useEffect(() => {
    // Fetch lessons for the unit
    fetch(`http://localhost:5000/api/lessons/unit/${unitId}`)
      .then(res => res.json())
      .then(data => setLessons(data));

    // Fetch the unit title (for display)
    fetch(`http://localhost:5000/api/units/${unitId}`) // Make sure you have this route on your backend
      .then(res => res.json())
      .then(unitData => setUnitTitle(unitData.title));
  }, [unitId]);

  const handleAddLesson = () => {
    fetch('http://localhost:5000/api/lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newLessonTitle, unitId })
    })
      .then(res => res.json())
      .then(newLesson => setLessons([...lessons, newLesson]));
      setNewLessonTitle("")
  };

  const handleDeleteLesson = (id) => {
    fetch(`http://localhost:5000/api/lessons/${id}`, { method: 'DELETE' })
      .then(() => setLessons(lessons.filter(lesson => lesson._id !== id)));
  };



  return (
    <div className='flex-1 overflow-auto relative z-10'>
      

      
        <p> Tools Page  </p>
        <h1>{unitTitle} - Add Lesson</h1> {/* Display the unit title */}
      <input
        type="text"
        value={newLessonTitle}
        onChange={e => setNewLessonTitle(e.target.value)}
        placeholder="Lesson Title"
      />
      <button onClick={handleAddLesson}>Add Lesson</button>

      <h2>Lessons</h2>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson._id}>
            {lesson.title}
            <button onClick={() => handleDeleteLesson(lesson._id)}>Delete</button>
            <Link to={`/add-question/${lesson._id}`}>
              <button>Add Question</button>
            </Link>
            <Link to={`/ans-questions/${lesson._id}`}>
              <button>Answer Questions</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/units">
        <button>Back to Units</button>
      </Link>
        

    </div>
  );
};
export default LessonPage;
