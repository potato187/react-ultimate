import RenderRoutes from '@components/RenderRoutes/RenderRoutes';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {Provider} from "react-redux";
import store from "@redux/store.js";
import App from "./App.jsx";
import HomePage from "@components/HomePage/index.jsx";
import {PAGE_ROUTES} from "@routes/index.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<BrowserRouter>
			<RenderRoutes routes={PAGE_ROUTES} />
			{/*<Routes>*/}
			{/*	<Route path='/' element={<App />}>*/}
			{/*		<Route path='home' element={<HomePage />} />*/}
			{/*		<Route index element={<Navigate to='/home' />} />*/}
			{/*		<Route path='*' element={<Navigate to='/home' />} />*/}
			{/*	</Route>*/}
			{/*	<Route path='/auth' element={<App />}>*/}
			{/*		<Route index element={<><h1>auth</h1></>} />*/}
			{/*		<Route path='*' element={<Navigate to='' />} />*/}
			{/*	</Route>*/}
			{/*</Routes>*/}
		</BrowserRouter>
	</Provider>
);
