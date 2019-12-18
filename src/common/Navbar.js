import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import image from '../img/profile.png';

function Navbar(props){
    const [ title ] = useState(props.title);

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">
                <span className="d-block d-lg-none">{title}</span>
                <span className="d-none d-lg-block">
                    <img className="img-fluid img-profile rounded-circle mx-auto mb-2" src={`${image}`}/>
                </span>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/post">Posts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/logout`}>Log out</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
