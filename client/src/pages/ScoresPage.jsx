// ScoresPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ScoresPage = () => {
  const { lessonId } = useParams();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/scores/${lessonId}`)
      .then(res => res.json())
      .then(data => setScores(data));
  }, [lessonId]);

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <h2>Scores for Lesson</h2>
      <ul>
        {scores.map(score => (
          <li key={score._id}>
            User: {score.userId.name}, Score: {score.score}, Lesson: {score.lessonId.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoresPage;