import { FaTachometerAlt } from 'react-icons/fa';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './style.scss';

const RenderNavSideBar = ({ id, children = [], label, icon: Icon, to, ...props }) => {
	if (!children.length) {
		return (
			<MenuItem as='span' icon={<Icon />} key={id} {...props} className='sidebar-item'>
				{label}
				<Link to={to} />
			</MenuItem>
		);
	}

	return (
		<SubMenu label={label} icon={<Icon />} key={id} className='sidebar-submenu' {...props}>
			{children.map(RenderNavSideBar)}
		</SubMenu>
	);
};

const NavSideBar = ({ routes = [] }) => {
	return (
		<Sidebar className='nav-sidebar' width='320px'>
			<Menu>{routes.map(RenderNavSideBar)}</Menu>
		</Sidebar>
	);
};

export default NavSideBar;
