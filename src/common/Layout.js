import React from 'react';
import Navbar from './Navbar';

function Layout({children}){
    return(
        <>
            <Navbar title="Postealo"/>
            {children}
        </>
    );
}

export default Layout;
