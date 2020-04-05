import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Collapse } from 'reactstrap';

function NavComponent() {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
            <Navbar color='primary' dark expand='sm'>
                <div className='container'>
                    <NavbarBrand href='/students' className='mr-auto'>
                        Student Database
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className='mr-2' />
                    <Collapse isOpen={!collapsed} navbar className='ml-3'>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className='nav-link' to='/students'>
                                    Students <span className='sr-only'>(current)</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/courses'>
                                    Courses
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>
    );
}

export default NavComponent;
