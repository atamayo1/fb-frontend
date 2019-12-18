import React from 'react';
import {Route} from 'react-router-dom';
import Home from './views/Home';
import Post from './views/Post';
import Register from './views/Register';
import Logout from "./components/Logout";
import Update from "./views/Update";
import Detail from "./views/Detail";

function Routes(){
    return (<>
       <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/detail/:id" component={Detail} />
       <Route exact path="/update/:id" component={Update} />
        <Route exact path="/logout" component={Logout}/>
    </>);
}

export default Routes;
