import React from 'react';
import {Link} from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Input from '../common/Input';
import useForm from '../hooks/useForm';

const LOGIN_MUTATION = gql`
    mutation LOGIN($email: EmailAddress!,$password: String!){
        login(email: $email, password: $password){
            token
        }
    }
`;

function Home({history}) {
    const [sendLogin] = useMutation(LOGIN_MUTATION);

    const catchData = async (inputs) => {
        const {data, errors} = await sendLogin({variables: { ...inputs}});
        if(data) {
            const { login } = data;
            sessionStorage.setItem('fbToken', login.token);
            history.push('/post');
        }
        if (errors) alert(`Error with your login: ${errors}`);
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData);

    return(
       <>
           <div className="login-container">
               <div className="col-md-6 login-form">
                   <div className="login-logo">
                       <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                   </div>
                   <h3>Login</h3>
                   <form onSubmit={handleSubmit}>
                   < Input
                       name = "email"
                       label = "Email: "
                       type = "email"
                       placeholder = "Email *"
                       value={inputs.email}
                       change={handleInputChange}
                       required={true}
                   />
                   < Input
                       name = "password"
                       label = "Password: "
                       type = "password"
                       placeholder = "Password *"
                       className="form-control"
                       value={inputs.password}
                       change={handleInputChange}
                       required={true}
                   />

                   <div className="form-group">
                       <input type="submit" className="btnSubmit" value="Sign in"/>
                   </div>
                   <div className="form-group">
                       <Link to={`Register`} className="btnRegister">Register</Link>
                   </div>
                   </form>
               </div>
           </div>
       </>
    )
}

export default Home;
