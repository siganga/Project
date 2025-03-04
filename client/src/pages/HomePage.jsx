import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function HomePage() {
/*<button
      className="rounded-full w-14 h-14 bg-[#58cc02] text-white font-bold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm flex items-center justify-center"
    
    >
      hello
    </button>*/

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