import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function HomePage() {
  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <h1 className='text-2xl font-bold mb-4'> Choose which questionnaire  you want to take </h1>

      <div className="flex space-x-4"> {/* Add a flex container with space-x-4 class */}
        <Link to="/ISOQuestPage" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          ISO Questionnaire
        </Link>

        <Link to="/NISTQuestPage" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          NIST Questionnaire
        </Link>

        <Link to="/COBITQuestPage" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          COBIT Questionnaire
        </Link>
      </div>
    </div>
  );
}

export default HomePage;