import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RenderRoutes from './components/RenderRoutes/RenderRoutes';
import { ROUTES } from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<RenderRoutes routes={ROUTES} />
	</BrowserRouter>
);
