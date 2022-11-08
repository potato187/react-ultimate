import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import style from './style.module.scss';

const Header = () => {
	return (
		<Navbar expand='lg' className={style['navbar']}>
			<Container>
				<NavLink className='navbar-brand' to='/'>
					Quiz
				</NavLink>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<NavLink className={`nav-link ${style['nav-link']}`} to='/'>
							Home
						</NavLink>
						<NavLink className={`nav-link ${style['nav-link']}`} to='/auth'>
							Users
						</NavLink>
						<NavLink className={`nav-link ${style['nav-link']}`} to='admin'>
							Admin
						</NavLink>
					</Nav>
					<Nav>
						<NavDropdown title='Setting' id='basic-nav-dropdown'>
							<NavDropdown.Item>Profiles</NavDropdown.Item>
							<NavDropdown.Item>Log out</NavDropdown.Item>
							<NavDropdown.Item>Log in</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
