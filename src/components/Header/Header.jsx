import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {NavLink, useNavigate} from 'react-router-dom';
import style from './style.module.scss';
import {useSelector} from "react-redux";
import ThemeButton from "@components/ThemeButton/index.jsx";
import {PATH_ROUTES} from "@constant";

const Header = () => {
    const isAuthenticated = useSelector(state => state.isAuthenticated);
   	const navigate = useNavigate();

    return (
        <Navbar expand='lg' className={style['navbar']}>
            <Container>
                <NavLink className='navbar-brand' to='/'>
                    Quiz
                </NavLink>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
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
                        {
                            !isAuthenticated ?
                                (
                                    <div className='d-flex gap-1'>
										<ThemeButton data-button='dark outline' title='Login in' onClick={() => navigate(PATH_ROUTES.AUTH.LOGIN)} />
										<ThemeButton data-button='dark' className='rounded-0' title='Register'  onClick={() => navigate(PATH_ROUTES.AUTH.REGISTER)}/>
                                    </div>
                                )
                                :
                                (
                                    <NavDropdown title='Setting' id='basic-nav-dropdown'>
                                        <NavDropdown.Item>Profiles</NavDropdown.Item>
                                        <NavDropdown.Item>Log out</NavDropdown.Item>
                                    </NavDropdown>
                                )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
