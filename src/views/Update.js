import React, { useState} from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from './../common/Layout';
import Input from '../common/Input';
import useForm from '../hooks/useForm';
import authHoc from "../utils/authHoc";
import {Link} from "react-router-dom";
import authenticate from "../utils/authenticate";

const UPDATE_POST = gql`
    mutation updatePost($id: ID!, $data:PostInputUpdate!){
        updateOnePost(id: $id, data:$data){
            _id
        }
    }
`;

const GET_POST = gql `
    query getPost($id:ID!){
        getSinglePost(id:$id){
            title
            content
            cover
        }
    }
`;
// post/:id match.params.id
function Update({match, history}){

    const [ sendPost ] = useMutation(UPDATE_POST);
    const [cover, setCover] = useState('');
    const [coverPreview, setCoverPreview] = useState('');
    const { isAuthenticated } = authenticate();

    const { data, loading } = useQuery(GET_POST, {
        variables: {
            id: match.params.id
        }
    });

    const catchCover = event =>{
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            setCover(file);
            setCoverPreview(reader.result);
        };

        reader.readAsDataURL(file);
    };
    // Modificarlo
    const catchData = async (inputs) => {
        delete inputs.cover;
        const newData = cover ? {
                ...inputs,
                cover,
            } :
            {
                ...inputs,
            };
        const { data, errors} = await sendPost({ variables:{ id:match.params.id, data:newData } });

        if (data) history.push('/');
        if (errors) alert(errors);
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData, data);

    if (loading) return <h1>¡Cargando!</h1>;

    return(
        <>
            <Layout>
                <div className="container">
                    <h2>Edit</h2>
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <form onSubmit={handleSubmit}>
                                <Input
                                    name = "title"
                                    label = "Title"
                                    type = "text"
                                    placeholder = "Title Post"
                                    value={inputs.title}
                                    change={handleInputChange}
                                />
                                <div className="control-group">
                                    <div className="form-group floating-label-form-group controls">
                                        <label>Content</label>
                                        <textarea cols="30" rows="10" className="form-control"
                                                  placeholder="Content"
                                                  name="content"
                                                  onChange={handleInputChange}
                                                  value={inputs.content}
                                        />
                                        <p className="help-block text-danger"/>
                                    </div>
                                </div>
                                <Input
                                    name = "cover"
                                    label = "Cover "
                                    type = "file"
                                    placeholder = "Select file"
                                    change={catchCover}
                                />
                                {
                                    data.getSinglePost.cover ?
                                        (<>
                                            <h4>Imagen Previa</h4>
                                            <img src={data.getSinglePost.cover} alt="cover" className="b-block w-50"/>
                                        </>): (<></>)
                                }

                                <img src={coverPreview} alt="" className="b-block w-50"/>
                                <div className="clearfix mt-4">
                                    { isAuthenticated ? (
                                        <button type="submit" className="btn btn-primary" >Update Post</button>
                                        ): (<>
                                        <Link to={`/login`}>
                                            <button type="submit" className="btn btn-primary" >Update Post</button>
                                        </Link>
                                    </>)
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default authHoc(Update);
