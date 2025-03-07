import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const AddQuestion = () => {
    const { lessonId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [newQuestionText, setNewQuestionText] = useState('');
    const [newQuestionAnswer, setNewQuestionAnswer] = useState('');
    const [lessonTitle, setLessonTitle] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5000/api/questions/lesson/${lessonId}`)
            .then(res => res.json())
            .then(data => setQuestions(data));

        fetch(`http://localhost:5000/api/lessons/${lessonId}`)
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
        setNewQuestionText("");
        setNewQuestionAnswer("");
    };

    const handleDeleteQuestion = (id) => {
        fetch(`http://localhost:5000/api/questions/${id}`, { method: 'DELETE' })
            .then(() => setQuestions(questions.filter(question => question._id !== id)));
    };

    const handleBack = () => {
        navigate(-1); // Navigate back one page in history
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold mb-2">{lessonTitle} Add Question</h1>
                <div className="space-y-2">
                    <input
                        type="text"
                        value={newQuestionText}
                        onChange={e => setNewQuestionText(e.target.value)}
                        placeholder="Question Text"
                        className="border text-black rounded p-2 w-full"
                    />
                    <input
                        type="text"
                        value={newQuestionAnswer}
                        onChange={e => setNewQuestionAnswer(e.target.value)}
                        placeholder="Question Answer"
                        className="border text-black rounded p-2 w-full"
                    />
                    <button
                        onClick={handleAddQuestion}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        Add Question
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Questions</h2>
                {questions.length > 0 ? (
                    <ul className="space-y-2">
                        {questions.map(question => (
                            <li
                                key={question._id}
                                className="border rounded p-3 flex items-center justify-between"
                            >
                                <span>{question.text} - {question.answer}</span>
                                <button
                                    onClick={() => handleDeleteQuestion(question._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No questions available.</p>
                )}
            </div>

            <div className="mt-4">
                <button
                    onClick={handleBack} // Use the handleBack function
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default AddQuestion;