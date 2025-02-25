import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameScreen from './GameScreen';

function AnswerQuestions() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false); // New state for submission
  const [correct, setCorrect] = useState(null); // New state for correctness
  const [lessonTitle, setLessonTitle] = useState('');
  const [heroLives, setHeroLives] = useState(3);
  const [monsterLives, setMonsterLives] = useState(3);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isMonsterAttacking, setIsMonsterAttacking] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/questions/lesson/${lessonId}`)
      .then(res => res.json())
      .then(data => setQuestions(data));

    fetch(`http://localhost:5000/api/lessons/${lessonId}`)
      .then(res => res.json())
      .then(lessonData => setLessonTitle(lessonData.title));
  }, [lessonId]);

   const handleAttackAnimation = async (isCorrect) => {
    if (isCorrect) {
      setIsAttacking(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsAttacking(false);
      setMonsterLives(prev => prev - 1);
    } else {
      setIsMonsterAttacking(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsMonsterAttacking(false);
      setHeroLives(prev => prev - 1);
    }
  };
 

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setSubmitted(false); // Reset submitted state
      setCorrect(null)
    } else {
      alert("You have reached the end of the questions");
      navigate(`/lesson/${lessonId}`);
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase();
    setCorrect(isCorrect);
    await handleAttackAnimation(isCorrect);

    if (monsterLives <= 1 && isCorrect) {
      alert("Congratulations! You've defeated the monster!");
      navigate(`/lesson/${lessonId}`);
    }
    if (heroLives <= 1 && !isCorrect) {
      alert("Game Over! The monster has defeated you!");
      navigate(`/lesson/${lessonId}`);
      
    }
  };


  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];


  const handleGameOver = () => {
      alert("Game Over")
      navigate(`/lesson/${lessonId}`);
  }

  return (
    <div className='flex-1 overflow-auto relative z-10'> {/* Tailwind container */}

     <GameScreen 
        heroLives={heroLives} 
        monsterLives={monsterLives} 
        isAttacking={isAttacking} 
        isMonsterAttacking={isMonsterAttacking} 
      /> 

      <h1 className="text-2xl font-bold mb-4">{lessonTitle} - Question {currentQuestionIndex + 1} of {questions.length}</h1>
      <p className="mb-2">{currentQuestion.text}</p>
      <input
        type="text"
        value={userAnswer}
        onChange={e => setUserAnswer(e.target.value)}
        placeholder="Your Answer"
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full" // Tailwind input styling
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" // Tailwind button styling
      >
        Submit
      </button>
      <button
        onClick={handleNextQuestion}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" // Tailwind button styling
        disabled = {!submitted}
      >
        Next Question
      </button>

      {submitted && ( // Conditionally render the answer and highlight
        <p
          className={`mt-2 ${
            correct ? 'text-green-500 bg-green-100 p-2 rounded' : 'text-red-500 bg-red-100 p-2 rounded'
          }`} // Tailwind conditional styling
        >
          Your Answer: {userAnswer}
        </p>
      )}
    </div>
  );
}

export default AnswerQuestions;