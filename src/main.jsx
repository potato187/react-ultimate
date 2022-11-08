import RenderRoutes from '@components/RenderRoutes/RenderRoutes';
import { ROUTES } from '@routes';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import store from "@redux/store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<BrowserRouter>
			<RenderRoutes routes={ROUTES} />
		</BrowserRouter>
	</Provider>
);
