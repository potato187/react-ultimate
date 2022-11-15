import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {FULL_PATH_ROUTES} from "@constant";
import {userLogOut} from "@redux/action/userAction.js";
import ThemeButton from "@components/ThemeButton";
import style from './style.module.scss';

const Header = () => {
    const isAuthenticated = useSelector(state => state?.user?.isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(userLogOut());
    }


    return (
        <Navbar expand='lg' className={style['navbar']}>
            <Container>
                <NavLink className='navbar-brand' to='/'>
                    Potato187
                </NavLink>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <NavLink className={`nav-link ${style['nav-link']}`} to='quiz'>
                            Quiz
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
                                        <ThemeButton data-button='dark outline' title='Login in'
                                                     onClick={() => navigate(FULL_PATH_ROUTES.AUTH_LOGIN)}/>
                                        <ThemeButton data-button='dark' className='rounded-0' title='Register'
                                                     onClick={() => navigate(FULL_PATH_ROUTES.AUTH_REGISTER)}/>
                                    </div>
                                )
                                :
                                (
                                    <NavDropdown title='Setting' id='basic-nav-dropdown'>
                                        <NavDropdown.Item>Profiles</NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
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
