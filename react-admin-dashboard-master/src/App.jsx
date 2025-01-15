import { Route, Routes } from "react-router-dom";
import React, { useState, useContext } from 'react';
import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
//Questionnaires ISORecomPage      COBITQuestPage



import ISORecomPage from "./pages/Questionnaires/ISORecomPage";
import COBITQuestPage from "./pages/Questionnaires/COBITQuestPage";

import COBITAdd from "./pages/Questionnaires/Addition/COBITAdd";
import COBITList from "./pages/Questionnaires/Addition/COBITList";

import COBITResults from "./pages/Questionnaires/Results/COBITResults";


import { COBITResultContext  } from "./contexts/COBITResultContext";

//
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

function App() {

	const [cobitResult, setCobitResult] = useState({}); 

	return (
		 
       
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
		<Provider store={store}>
		 <PersistGate loading={null} persistor={persistor}>
		
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Routes>
				<Route path='/' element={<OverviewPage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/sales' element={<SalesPage />} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />
				<Route path='/settings' element={<SettingsPage />} />

				<Route path='/ISO-Q' element={<ISORecomPage />} />
				<Route path='/COBITQuestPage' element={<COBITQuestPage />} />

				<Route path='/COBITAdd' element={<COBITAdd/>} />
				<Route path='/COBITList' element={<COBITList/>} />
				<Route path='/COBITResults' element={<COBITResults/>} />
				 

			</Routes>
				 </PersistGate>
			 </Provider>
		</div>

	);
}

export default App;
