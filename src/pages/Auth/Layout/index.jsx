import { Outlet } from 'react-router-dom';
import style from './style.module.scss';

const Layout = ({ children }) => {
	return (
		<>
			<div className={style['page-auth']}>
				<div className={style['page-auth__wrapper']}>
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default Layout;
