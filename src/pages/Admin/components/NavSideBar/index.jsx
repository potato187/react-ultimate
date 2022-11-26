import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link, NavLink, useLocation } from 'react-router-dom';
import style from './style.module.scss';

const RenderNavSideBar = ({ id, children = [], label, icon: Icon, to, ...props }) => {
	const location = useLocation();
	if (!children.length) {
		return (
			<MenuItem
				routerLink={<NavLink to={to} />}
				as='span'
				icon={<Icon size='1.5em' />}
				key={id}
				label={label}
				className={style['sidebar-item']}
				active={location.pathname.includes(to)}
				{...props}>
				{label}
			</MenuItem>
		);
	}

	return (
		<SubMenu label={label} icon={<Icon />} key={id} className={style['sidebar-submenu']} {...props}>
			{children.map(RenderNavSideBar)}
		</SubMenu>
	);
};

const NavSideBar = ({ routes = [] }) => {
	return (
		<Sidebar className={style['nav-sidebar']} width='320px'>
			<Menu>{routes.map(RenderNavSideBar)}</Menu>
		</Sidebar>
	);
};

export default NavSideBar;
