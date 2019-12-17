import React from 'react';
import {Redirect} from 'react-router-dom';

function Logout(){
    sessionStorage.removeItem('blogToken');
    console.log('Entre al logout');
    return <Redirect to={``}/>
}

export default Logout;
