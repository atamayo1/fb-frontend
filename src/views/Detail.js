import React, { useState} from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from './../common/Layout';
import Input from '../common/Input';
import useForm from '../hooks/useForm';
import authHoc from "../utils/authHoc";

const UPDATE_POST = gql`
    mutation updatePost($id:ID!,$data:PostUpdateInput!){
        updateOnePost(id:$id,data:$data){
            _id,
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
function Detail({match, history}){

    const [ sendPost ] = useMutation(UPDATE_POST);
    const [cover, setCover] = useState('');
    const [coverPreview, setCoverPreview] = useState('');

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
        debugger;
        const { data, errors} = await sendPost({variables:{id:match.params.id,data:newData }});
        debugger;


        if (data) history.push('');
        if (errors) alert(errors);
    };

    const {
        inputs,
        handleInputChange,
    } = useForm(catchData, data);

    if (loading) return <h1>¡Cargando!</h1>;

    return(
        <>
            <Layout head="Actualiza o modifica tu post."
                    subhead=":D">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <form>
                                <Input
                                    name = "title"
                                    label = "Title"
                                    type = "text"
                                    placeholder = "Title Post"
                                    value={inputs.title}
                                    disabled
                                    onChange={handleInputChange}
                                />
                                <div className="control-group">
                                    <div className="form-group floating-label-form-group controls">
                                        <label>Content</label>
                                        <textarea cols="30" rows="10" className="form-control"
                                                  placeholder="Content"
                                                  name="content"
                                                  disabled
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
                                    disabled
                                    placeholder = "Select file"
                                    onChange={catchCover}
                                />
                                {
                                    data.getSinglePost.cover ?
                                        (<>
                                            <h4>Imagen Previa</h4>
                                            <img src={data.getSinglePost.cover} alt="cover" className="b-block w-50"/>
                                        </>): (<></>)
                                }

                                <img src={coverPreview} alt="" className="b-block w-50"/>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default authHoc(Detail);
