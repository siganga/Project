// ScoresPage.js
import React, { useState, useEffect, useRef } from 'react'; // 
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas'; // 
import jsPDF from 'jspdf'; // 


const ScoresPage = () => {
  const { lessonId } = useParams();
  const [scores, setScores] = useState([]);
  const [lessonTitle, setLessonTitle] = useState('Leaderboard'); // State to hold lesson title
  const navigate = useNavigate();
  const leaderboardRef = useRef(null); //

  useEffect(() => {
    fetch(`http://localhost:5000/api/scores/${lessonId}`)
      .then((res) => res.json())
      .then((data) => {
        // Sorts scores by score in descending order
        const sortedScores = data.sort((a, b) => b.score - a.score);
        setScores(sortedScores);

        // Extracts lesson title from the first score (if it is  available)
        if (data.length > 0) {
            setLessonTitle(data[0].lessonId.title || 'Leaderboard');
        }
      });
  }, [lessonId]);

  //  Function to download report as pdf
  const downloadLeaderboard = () => {
    if (leaderboardRef.current) {
      html2canvas(leaderboardRef.current, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; 
        const pageHeight = 295; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        const fileName = `${lessonTitle}_Leaderboard.pdf`.replace(/ /g, '_');
        pdf.save(fileName);
      });
    }
  };
  

 const handleBack = () => {
        navigate(-1);
    };


  return (
    <div className="flex flex-col flex-1 overflow-auto relative z-10 p-6">
      <button
        onClick={handleBack}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded absolute top-2 right-2"
      >
        Back
      </button>
      
    
      <button
        onClick={downloadLeaderboard}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-2 right-20"
      >
        Download Report ⬇️
      </button>
     

     
      <div ref={leaderboardRef} className="p-4 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Leaderboard ({lessonTitle})
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                User
              </th>
             
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Lesson
              </th>
               <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr key={score._id} className="border-b">
                <td className="py-2 px-4 text-gray-800">
                  {score.userId.name}
                </td>
                 <td className="py-2 px-4 text-gray-800">
                  {score.lessonId.title}
                </td>
                <td className="py-2 px-4 text-gray-800">{score.score}%</td>
               
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
    </div>
  );
};

export default ScoresPage;
