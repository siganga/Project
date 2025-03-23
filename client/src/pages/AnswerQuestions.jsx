// AnswerQuestions.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameScreen from './GameScreen';
import { useSelector } from 'react-redux'; // Import useSelector

function AnswerQuestions() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [heroLives, setHeroLives] = useState(3);
  const [monsterLives, setMonsterLives] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isMonsterAttacking, setIsMonsterAttacking] = useState(false);
  const [score, setScore] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  const user = useSelector((state) => state.auth.user) || ""; // Get user from Redux
  const userId = user ? user.userId : null; // Extract userId

  useEffect(() => {
   fetch(`http://localhost:5000/api/questions/lesson/${lessonId}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setMonsterLives(data.length); // Set monster lives to the number of questions
      });
      
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

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setSubmitted(false);
      setCorrect(null);
      setQuestionAnswered(false);
    } else {
      // Store the score when the last question is answered
      if (userId) {
        try {
          const response = await fetch('http://localhost:5000/api/scores', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,
              lessonId: lessonId,
              score: score,
            }),
          });
          if (response.ok) {
            alert(`You have reached the end of the questions. Your final score is: ${score}. Score saved!`);
          } else {
            alert(`You have reached the end of the questions. Your final score is: ${score}. Failed to save score.`);
          }
        } catch (error) {
          console.error('Error saving score:', error);
          alert(`You have reached the end of the questions. Your final score is: ${score}. Failed to save score.`);
        }
      } else {
        alert(`You have reached the end of the questions. Your final score is: ${score}. User not logged in. Score not saved.`);
      }

      navigate(`/`);
    }
  };

  const handleSubmit = async () => {
    if (questionAnswered) return;

    setSubmitted(true);
    setQuestionAnswered(true);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase();
    setCorrect(isCorrect);
    await handleAttackAnimation(isCorrect);

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    if (monsterLives <= 1 && isCorrect) {
      alert(`Congratulations! You've defeated the monster! Your final score is: ${score}`);
      navigate(`/`);
    }
    if (heroLives <= 1 && !isCorrect) {
      alert(`Game Over! The monster has defeated you! Your final score is: ${score}`);
      navigate(`/`);
    }
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <GameScreen
        heroLives={heroLives}
        monsterLives={monsterLives}
        isAttacking={isAttacking}
        isMonsterAttacking={isMonsterAttacking}
        score={score}
      />
      <h1 className="text-2xl  font-bold mb-4">{lessonTitle}  Question {currentQuestionIndex + 1} of {questions.length}</h1>
      <p className="mb-2">{currentQuestion.text}</p>
      <input
        type="text"
        value={userAnswer}
        onChange={e => setUserAnswer(e.target.value)}
        placeholder="Your Answer"
        className="border border-gray-300 text-black rounded px-3 py-2 mb-2 w-full"
        disabled={questionAnswered}
      />
      <button
        onClick={handleSubmit}
        className={`text-white font-bold py-2 px-4 rounded mr-2 ${
          questionAnswered ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
        }`}
        disabled={questionAnswered}
      >
        Submit
      </button>
      <button
        onClick={handleNextQuestion}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        disabled={!submitted}
      >
        Next Question
      </button>

      {submitted && (
        <div>
          <p
            className={`mt-2 ${
              correct ? 'text-green-500 bg-green-100 p-2 rounded' : 'text-red-500 bg-red-100 p-2 rounded'
            }`}
          >
            Your Answer: {userAnswer}
          </p>
          <p className="mt-2">
            Correct Answer: {currentQuestion.answer}
          </p>
        </div>
      )}
     {/* <p>Score: {score}</p>*/}
    </div>
  );
}

export default AnswerQuestions;