// ScoresPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const ScoresPage = () => {
  const { lessonId } = useParams();
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/scores/${lessonId}`)
      .then((res) => res.json())
      .then((data) => {
        // Sorts scores by score in descending order
        const sortedScores = data.sort((a, b) => b.score - a.score);
        setScores(sortedScores);
      });
  }, [lessonId]);

 const handleBack = () => {
        navigate(-1);
    };


  return (
    <div className="flex flex-col flex-1 overflow-auto relative z-10 p-6">
      <button
                    onClick={handleBack}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back
                </button>
      <h2 className="text-2xl font-semibold mb-4 text-gray-100">
          Leaderboard
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                User
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Score
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Lesson
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr key={score._id} className="border-b">
                <td className="py-2 px-4 text-gray-800">
                  {score.userId.name}
                </td>
                <td className="py-2 px-4 text-gray-800">{score.score}</td>
                <td className="py-2 px-4 text-gray-800">
                  {score.lessonId.title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {scores.length === 0 && (
          <div className="mt-4 text-center text-gray-500">
            No scores available for this lesson.
          </div>
        )}
    </div>
  );
};

export default ScoresPage;