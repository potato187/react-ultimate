import RenderRoutes from '@components/RenderRoutes/RenderRoutes';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {store, persistor} from "@redux/store.js";
import {PAGE_ROUTES} from "@routes/index.jsx";
import {PersistGate} from 'redux-persist/integration/react'


ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
		<BrowserRouter>
			<RenderRoutes routes={PAGE_ROUTES} />
		</BrowserRouter>
		</PersistGate>
	</Provider>
);
