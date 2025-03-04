import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const UnitPage = () => {
    const [units, setUnits] = useState([]);
    
    const { classroomId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/units?classroom=${classroomId}`)
            .then(res => res.json())
            .then(data => setUnits(data));
    }, [classroomId]);

   

    // <h1 className="text-2xl font-semibold mb-2">Units (Classroom: {classroomId})</h1>
               

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold mb-2">Classroom: {classroomId}</h1>
                <h1 className="text-2xl font-semibold mb-2">Units</h1>
               
            </div>

            <div className="mt-4">
                {units.length > 0 ? (
                    <ul className="space-y-2">
                        {units.map(unit => (
                            <li
                                key={unit._id}
                                className="border rounded p-3 flex items-center justify-between"
                            >
                                <span>{unit.title}</span>
                                <div className="flex space-x-2">
                                    
                                    <Link to={`/lesson/${unit._id}`}>
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm">
                                             Lessons
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No units available.</p>
                )}
            </div>
        </div>
    );
};

export default UnitPage;