import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from "./components/common/Sidebar";
import HomePage from "./pages/HomePage";
import AddLesson from "./pages/CRUD/AddLesson"
import AddQuestion from "./pages/CRUD/AddQuestion"
import AddUnit from "./pages/CRUD/AddUnit"
import AddClassroom from "./pages/CRUD/AddClassroom"
import UnitPage from "./pages/UnitPage";
import ClassroomPage from "./pages/ClassroomPage";
import AnswerQuestions from "./pages/AnswerQuestions";
import LessonPage from "./pages/LessonPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminSignUp from "./pages/authentication/AdminSignUp";
import ProfilePage from "./pages/ProfilePage";
import ShareClassroomPage from './pages/ShareClassroomPage';
import ScoresPage from './pages/ScoresPage';
import GeminiPromptPage from './pages/GeminiPromptPage';
import ClassroomUsersPage from './pages/secondary-pages/ClassroomUsersPage.jsx';
import UploadAsset from './pages/secondary-pages/UploadAsset.jsx';
import AssetList from './pages/secondary-pages/AssetList.jsx';
import ChangeLessonAssets from './pages/secondary-pages/ChangeLessonAssets.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

// A new component to protect routes
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to="/access" replace />;
  }
  return children;
};

function App() {
  const location = useLocation();
  const [cobitResult, setCobitResult] = useState({});

  const noSidebarPaths = [
    '/ans-questions/:lessonId',
    '/home',
    '/access',
    "/login",
    "/signup",
    "/signup-admin"
  ];

  const shouldShowSidebar = !noSidebarPaths.includes(location.pathname) &&
                            !location.pathname.startsWith('/ans-questions');

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className='fixed inset-0 z-0'>
            <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
            <div className='absolute inset-0 backdrop-blur-sm' />
          </div>

          {shouldShowSidebar && <Sidebar />}
          <Routes>
            {/* Public Routes - Accessible to everyone */}
            
            <Route path='/home' element={<ProfilePage />} />
            <Route path='/access' element={<ProfilePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup-admin" element={<AdminSignUp />} />

            {/* Protected Routes - Only accessible when logged in */}
            <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path='/add-unit/:classroomId' element={<ProtectedRoute><AddUnit /></ProtectedRoute>} />
            <Route path="/add-lesson/:unitId" element={<ProtectedRoute><AddLesson /></ProtectedRoute>} />
            <Route path="/add-question/:lessonId" element={<ProtectedRoute><AddQuestion /></ProtectedRoute>} />
            <Route path="/add-classrooms" element={<ProtectedRoute><AddClassroom /></ProtectedRoute>} />
            <Route path='/unit/:classroomId' element={<ProtectedRoute><UnitPage /></ProtectedRoute>} />
            <Route path="/lesson/:unitId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
            <Route path="/classrooms" element={<ProtectedRoute><ClassroomPage /></ProtectedRoute>} />
            <Route path="/ans-questions/:lessonId" element={<ProtectedRoute><AnswerQuestions /></ProtectedRoute>} />
            <Route path="/classrooms/:id/share" element={<ProtectedRoute><ShareClassroomPage /></ProtectedRoute>} />
            <Route path="/scores/:lessonId" element={<ProtectedRoute><ScoresPage /></ProtectedRoute>} />
            <Route path="/gem" element={<ProtectedRoute><GeminiPromptPage /></ProtectedRoute>} />
            <Route path="/classrooms/:id/users" element={<ProtectedRoute><ClassroomUsersPage /></ProtectedRoute>} />
            <Route path="/upload-asset" element={<ProtectedRoute><UploadAsset /></ProtectedRoute>} />
            <Route path="/assets" element={<ProtectedRoute><AssetList /></ProtectedRoute>} />
            <Route path="/change-assets/:lessonId" element={<ProtectedRoute><ChangeLessonAssets /></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

          </Routes>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;