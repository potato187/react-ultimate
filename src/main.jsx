import RenderRoutes from '@components/RenderRoutes/RenderRoutes';
import { ROUTES } from '@routes';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<RenderRoutes routes={ROUTES} />
	</BrowserRouter>
);
