// Reports.js

import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // 1. IMPORT useSelector
import html2canvas from 'html2canvas'; 
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';


function Reports() {
  const location = useLocation();
  const navigate = useNavigate();
  const reportContentRef = useRef(null); 

  // 
  const userName = useSelector((state) => state.auth.user?.name);

  // Destructure of new 'history' array
  const { correct, total, lessonTitle, history, lessonId } = location.state || {};

  if (!correct || !total || !history) {
    return (
      <div className="p-8 text-black">
        <p>No report data found. Please complete a lesson first.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }
  
  // calculates percentage and checks passmark
  const percentage = (correct / total) * 100;
  const hasPassed = percentage >= 75;
  
  const downloadReport = () => {
  const element = reportContentRef.current;
  if (!element) return;

  const opt = {
    margin:       10,
    filename:     `${lessonTitle}_Report.pdf`.replace(/ /g, '_'),
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'p' },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] } // avoids cutting elements
  };

  html2pdf().set(opt).from(element).save();
};

  /*
  const downloadReport = () => {
    if (reportContentRef.current) {
      
      html2canvas(reportContentRef.current, { scale: 2 }).then(canvas => {
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

        const fileName = `${lessonTitle}_Report.pdf`.replace(/ /g, '_');
        pdf.save(fileName);
      });
    }
  };
   */

  return (
    // Ap
    <div className="p-8 text-black  z-10 min-h-screen overflow-y-auto " >
      
     
      <div ref={reportContentRef} className="p-6 bg-white shadow-lg rounded-lg text-black">
          
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            {userName ? `Name: ${userName}` : 'Guest Report'}
          </h2>
         
          
        <h1 className="text-3xl font-bold mb-4 border-b pb-2">Lesson Report ({lessonTitle})</h1>
        <p className="text-xl mb-4">
            You answered <span className="text-blue-600 font-extrabold">{correct}</span> <span> </span>
           out of <span className="font-extrabold">{total}</span> questions correctly! 
            <span role="img" aria-label="party popper"> 🎉</span>
        </p>
        
        
        {hasPassed ? ( <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert"> 
<p className="font-bold">Congratulations!</p>
<p>You have gotten  a score above the passmark(75%) with a score of {percentage.toFixed(0)}%.</p>
</div> ) : ( <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert"> 
 <p>Your final score is {percentage.toFixed(0)}%. </p> 
</div> )}
        {/*  The required passmark is 75%. Keep practicing! */}
        
        <h2 className="text-2xl font-semibold mb-3 border-b pb-1">Question Breakdown</h2>
        <div className="space-y-4">
          {history.map((item, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg border ${item.isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}
            >
              <p className="font-bold">
                {/* Status Mark and Question Number */}
                <span className={`mr-2 font-extrabold text-lg ${item.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {item.isCorrect ? '✓' : '✗'} 
                </span>
                Question {index + 1}: {item.text}
              </p>
              
              {/* User Answer and Correct Answer Details */}
              <p className="ml-6 text-sm mt-1">
                Your Answer: 
                <span className={`font-semibold ${item.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {item.userAnswer || '[No Answer Provided]'}
                </span>
              </p>
              {!item.isCorrect && (
                <p className="ml-6 text-sm">
                  Correct Answer: <span className="font-semibold">{item.correctAnswer}</span>
                </p>
              )}
            </div>
          ))}
        </div>
        
        <p className="text-black mt-6">Thank you  {userName} for completing the lesson!</p>
      </div>
      
      <div className="mt-6 flex space-x-4">
        <button
          onClick={downloadReport}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Report ⬇️
        </button>

        <button
          onClick={() => navigate('/')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Home
        </button>

        <button
          onClick={() => navigate(`/scores/${lessonId}`)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Leaderboard
        </button>
      </div>
    </div>
  );
}

export default Reports;