import {Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar';
import {Link} from 'react-router-dom';
import style from './style.module.scss';

const RenderNavSideBar = ({ id, children = [], label, icon: Icon, to, ...props }) => {
	if (!children.length) {
		return (
			<MenuItem as='span' icon={<Icon />} key={id} {...props} className={style['sidebar-item']}>
				{label}
				<Link to={to} />
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
