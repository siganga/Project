import { Route, Routes, useLocation } from "react-router-dom";
import React, { useState, useContext } from 'react';
import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ToolsPage from "./pages/ToolsPage";

import AnalyticsPage from "./pages/AnalyticsPage";

//


import HomePage from "./pages/HomePage";
//
import ISOQuestPage from "./pages/Questionnaires/ISOQuestPage";
import COBITQuestPage from "./pages/Questionnaires/COBITQuestPage";
import NISTQuestPage from "./pages/Questionnaires/NISTQuestPage";
//
import COBITAdd from "./pages/Questionnaires/Addition/COBITAdd";
import COBITList from "./pages/Questionnaires/Addition/COBITList";
import ISOAdd from "./pages/Questionnaires/Addition/ISOAdd";
import ISOList from "./pages/Questionnaires/Addition/ISOList";
import NISTAdd from "./pages/Questionnaires/Addition/NISTAdd";
import NISTList from "./pages/Questionnaires/Addition/NISTList";
//
import QUESTResults from "./pages/Questionnaires/Results/QUESTResults";


import AddLesson from "./pages/AddLesson"

import AddQuestion from "./pages/AddQuestion"

//

import UnitPage from "./pages/UnitPage";
import ClassroomPage from "./pages/ClassroomPage";
import AnswerQuestions from "./pages/AnswerQuestions";



/*
import UnitAdd from "./pages/CRUD/UnitAdd";
				<Route path='/UnitAdd' element={<UnitAdd/>} />
				import LessonPage from "./pages/LessonPage";

					<Route path="/lesson/:lessonId" element={<LessonPage />} /> {/* Dynamic route for lessons /}

*/




import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

function App() {
	const location = useLocation();
	const [cobitResult, setCobitResult] = useState({}); 

	//  Paths where we don't want the sidebar to show  '/home',  '/'
  const noSidebarPaths = [
    '/NISTQuestPage',
    '/COBITQuestPage',
    '/ISOQuestPage',
  ];
  const shouldShowSidebar = !noSidebarPaths.includes(location.pathname);

	return (
		 
       
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
		<Provider store={store}>
		 <PersistGate loading={null} persistor={persistor}>
		
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			{shouldShowSidebar && <Sidebar />}
			<Routes>
				<Route path='/OverviewPage' element={<OverviewPage />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/home' element={<HomePage />} />

				
				<Route path='/tools' element={<ToolsPage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />
				
				<Route path='/ISOQuestPage' element={<ISOQuestPage />} />
				<Route path='/COBITQuestPage' element={<COBITQuestPage />} />
				<Route path='/NISTQuestPage' element={<NISTQuestPage />} />
				

				<Route path='/COBITAdd' element={<COBITAdd/>} />
				<Route path='/COBITList' element={<COBITList/>} />
				<Route path='/NISTAdd' element={<NISTAdd/>} />
				<Route path='/NISTList' element={<NISTList/>} />
				<Route path='/ISOAdd' element={<ISOAdd/>} />
				<Route path='/ISOList' element={<ISOList/>} />

			


				
				<Route path='/QUESTResults' element={<QUESTResults/>} />

       <Route path="/add-lesson/:unitId" element={<AddLesson />} /> 
				
				<Route path="/add-question/:lessonId" element={<AddQuestion />} />
				<Route path="/ans-questions/:lessonId" element={<AnswerQuestions />} />

                           

				<Route path='/add-unit/:classroomId' element={<UnitPage />} />
				<Route path="/classrooms" element={<ClassroomPage />} />
				
				 

			</Routes>
				 </PersistGate>
			 </Provider>
		</div>

	);
}

export default App;
