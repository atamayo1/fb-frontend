import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Input from '../common/Input';
import useForm from '../hooks/useForm';

const CREATE_MUTATION = gql`
    mutation AddAuthor($data:UserInput!){
        createNewUser(data:$data){
            _id,
            email,
            first_name
        }
    }
`;

function Register({history}) {
    const [ sendSignup ] = useMutation(CREATE_MUTATION);

    const catchData = async (inputs) => {
        if(inputs.password === inputs.confirm_password){
            delete inputs.confirm_password;
            console.log(inputs)
            const { data } = await sendSignup({variables:{data:{...inputs}}});
            if(data){
                if(data.errors) console.log(data.errors);
                history.push('/');
            }
        } else {
            alert('Your password does not match');
        }
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
                    <h3>Register</h3>
                    <form onSubmit={handleSubmit}>
                        < Input
                            name = "first_name"
                            label = "Fist name: "
                            type = "text"
                            placeholder = "First name *"
                            value={inputs.first_name}
                            change={handleInputChange}
                            required={true}
                        />
                        < Input
                            name = "last_name"
                            label = "Last name: "
                            type = "text"
                            placeholder = "Last name *"
                            value={inputs.last_name}
                            change={handleInputChange}
                            required={true}
                        />
                        < Input
                            name = "username"
                            label = "Username: "
                            type = "text"
                            placeholder = "Username *"
                            value={inputs.username}
                            change={handleInputChange}
                            required={true}
                        />
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
                            value={inputs.password}
                            change={handleInputChange}
                            required={true}
                        />
                        < Input
                            name = "confirm_password"
                            label = "Confirm password: "
                            type = "password"
                            placeholder = "Confirm password *"
                            value={inputs.confirm_password}
                            change={handleInputChange}
                            required={true}
                        />
                        <div className="form-group">
                            <button type="submit" className="btnSubmit" >Sign up</button>
                        </div>
                    </form>
                    <div className="form-group">
                        <Link to={`/login`} className="btnLogin">Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
