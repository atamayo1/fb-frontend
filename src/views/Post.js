import React, { useState } from 'react';
import Layout from '../common/Layout';
import { useMutation } from 'react-apollo-hooks';
import gql from "graphql-tag";
import { useQuery } from 'react-apollo-hooks';
import PostPreview from "../components/PostPreview";
import useForm from '../hooks/useForm';
import Input from '../common/Input';
import authHoc from "../utils/authHoc";

const CREATE_POST = gql`
    mutation createPost($data:PostInput!){
        createNewPost(data:$data){
            _id,
        }
    }
`;

const ALL_POST =  gql`
    query getAllPosts{
        getPosts{
            _id
            title
            content
            cover
        }
    }
`;


function Post({history}) {
    const [ sendPost ] = useMutation(CREATE_POST);
    const [cover, setCover] = useState('');
    const [coverPreview, setCoverPreview] = useState('');

    const catchCover = event =>{
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            setCover(file);
            setCoverPreview(reader.result);
        };

        reader.readAsDataURL(file);
    };
    const catchData = async (inputs) => {
        const { data, errors} = await sendPost({variables:{data:{...inputs,cover}}});
        if (data) history.push('/post');
        if(errors) alert(errors);
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData);

    const { data, loading, error} = useQuery(ALL_POST);
    if(loading) return <h2>Cargando...</h2>;
    if(error) return <h2>Hubo un error :(</h2>;
    return(
        <>
            <Layout>
                <main className="container-fluid p-0">
                    <section className="row">
                        <div className="col-lg-8 col-md-10 mx-auto my-5">
                            <form onSubmit={handleSubmit}>
                                <Input
                                    name = "title"
                                    label = "Title"
                                    type = "text"
                                    placeholder = "Title Post *"
                                    value={inputs.title}
                                    change={handleInputChange}
                                    required={true}
                                />
                                <div className="control-group">
                                    <div className="form-group floating-label-form-group controls">
                                        <label>Content</label>
                                        <textarea cols="30" rows="10" className="form-control"
                                                  placeholder="Content *" required
                                                  name="content"
                                                  onChange={handleInputChange}
                                                  value={inputs.content}
                                        />
                                        <p className="help-block text-danger"/>
                                    </div>
                                </div>
                                < Input
                                    name = "cover"
                                    label = "Cover *"
                                    type = "file"
                                    placeholder = "Select file"
                                    value={inputs.cover}
                                    change={catchCover}
                                    required={true}
                                />
                                <img src={coverPreview} alt="cover" className="b-block w-50"/>
                                <div className="mt-4">
                                    <button type="submit" className="btn btn-primary">Crear Post</button>
                                </div>
                            </form>
                        </div>
                    </section>
                    <section className="row">
                        <div className="col-lg-8 col-md-10 mx-auto overflow-auto">
                            {
                               data.getPosts.map((post) =>(
                                    <PostPreview _id={post._id}
                                                 title={post.title}
                                                 content={post.content}
                                                 cover={post.cover}
                                                 key={post._id}
                                                 remove
                                    />
                                ))
                            }
                        </div>
                    </section>
                </main>
            </Layout>
        </>);
}

export default authHoc(Post);
