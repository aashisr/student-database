import React from 'react';
import {Link} from 'react-router-dom';

function NavComponent() {
	return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
                <div className='container'>
                    <Link className='navbar-brand' to='/students'>
                        Student Database
                    </Link>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-toggle='collapse'
                        data-target='#navbarNavAltMarkup'
                        aria-controls='navbarNavAltMarkup'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse ml-auto' id='navbarNavAltMarkup'>
                        <div className='navbar-nav'>
                            <Link className='nav-item nav-link active' to='/students'>
                                Students <span className='sr-only'>(current)</span>
                            </Link>
                            <Link className='nav-item nav-link' to='/courses'>
                                Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavComponent;
