import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Users/Header/Header';
import './App.scss';

function App() {
	return (
		<main className='app'>
			<div className='app-header'>
				<Header />
			</div>
			<div className='app-container'>
				<div className='app-sidebar'></div>
				<div className='app-main'>
					<Outlet />
				</div>
			</div>
		</main>
	);
}

export default App;
