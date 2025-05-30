import { Route, Routes, useLocation } from "react-router-dom";
import React, { useState, useContext } from 'react';
import Sidebar from "./components/common/Sidebar";






import HomePage from "./pages/HomePage";


import AddLesson from "./pages/CRUD/AddLesson"
import AddQuestion from "./pages/CRUD/AddQuestion"
import AddUnit from "./pages/CRUD/AddUnit"
import AddClassroom from "./pages/CRUD/AddClassroom"


//CRUD pages
import UnitPage from "./pages/UnitPage";
import ClassroomPage from "./pages/ClassroomPage";
import AnswerQuestions from "./pages/AnswerQuestions";
import LessonPage from "./pages/LessonPage";


//
import Signup from "./pages/Signup";// ./pages/authentication/Signup 
import Login from "./pages/Login";// ./pages/authentication/Login 
import AdminSignUp from "./pages/authentication/AdminSignUp";
import ProfilePage from "./pages/ProfilePage";
import ShareClassroomPage from './pages/ShareClassroomPage';
import ScoresPage from './pages/ScoresPage';

import GeminiPromptPage from './pages/GeminiPromptPage';


//


import ClassroomUsersPage from './pages/secondary-pages/ClassroomUsersPage.jsx';
import UploadAsset from './pages/secondary-pages/UploadAsset.jsx';
import AssetList from './pages/secondary-pages/AssetList.jsx';
import ChangeLessonAssets from './pages/secondary-pages/ChangeLessonAssets.jsx';


import AdminDashboard from './pages/admin/AdminDashboard.jsx';






import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

function App() {
	const location = useLocation();
	const [cobitResult, setCobitResult] = useState({}); 

	//  Paths where we don't want the sidebar to show  '/home',  '/'
  const noSidebarPaths = [
    '/ans-questions/:lessonId',
    '/home',
  ];
  //const shouldShowSidebar = !noSidebarPaths.includes(location.pathname);


const shouldShowSidebar = !noSidebarPaths.includes(location.pathname) && 
                            !location.pathname.startsWith('/ans-questions');


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
				
				<Route path='/' element={<HomePage/>} />
				<Route path='/home' element={<ProfilePage />} />

				
			
			


				
				

				<Route path='/add-unit/:classroomId' element={<AddUnit />} />
        <Route path="/add-lesson/:unitId" element={<AddLesson />} /> 
			  <Route path="/add-question/:lessonId" element={<AddQuestion />} />
			  <Route path="/add-classrooms" element={<AddClassroom  />} />



				

                           

				<Route path='/unit/:classroomId' element={<UnitPage />} />
				<Route path="/lesson/:unitId" element={<LessonPage/>} /> 
				<Route path="/classrooms" element={<ClassroomPage />} />
				<Route path="/ans-questions/:lessonId" element={<AnswerQuestions />} />



				<Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-admin" element={<AdminSignUp />} />       
        <Route path="/profile" element={<ProfilePage />} />


        <Route path="/classrooms/:id/share" element={<ShareClassroomPage />} />
        <Route path="/scores/:lessonId" element={<ScoresPage />} />

        <Route path="/classrooms/:id/users" element={<ClassroomUsersPage />} />
        

			<Route path="/gem" element={<GeminiPromptPage />} />	



			<Route path="/upload-asset" element={<UploadAsset />} />
			<Route path="/assets" element={<AssetList />} />
			<Route path="/change-assets/:lessonId" element={<ChangeLessonAssets />} />


			<Route path="/admin-dashboard" element={<AdminDashboard />} />


			



			</Routes>
				 </PersistGate>
			 </Provider>
		</div>

	);
}

export default App;
