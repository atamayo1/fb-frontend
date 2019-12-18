import React from 'react';
import { Link } from 'react-router-dom';
import {Card} from "reactstrap";
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import authenticate from '../utils/authenticate';

const DELETE_POST = gql`
    mutation deletePost($id:ID!){
        deleteOnePost(id:$id)
    }
`;

function PostPreview({_id, title, content, cover, remove}){
    const [deletePost] = useMutation(DELETE_POST);
    const { isAuthenticated } = authenticate();

    return (
        <Card className="border-0 bg-primary p-5 mw-100 mb-3">
            <div>
                <Link to={`/update/${_id}`} >
                    <h3 className="text-white">
                        {title}
                    </h3>
                    <p className="text-white">
                        {content}
                    </p>
                    <p>
                        <img src={`${cover}`} alt="" className="b-block w-50"/>
                    </p>
                </Link>
                <p>
                    {
                        isAuthenticated ? (
                            <p>
                                {
                                    remove ? <button className="btn btn-danger" onClick={ () => {
                                        deletePost({variables:{id:_id}}).then(() => {
                                            window.location.reload();
                                        })}
                                    }>Borrar Post</button>:<></>}
                            </p>
                        ) : (<></>)
                    }
                </p>
            </div>
        </Card>
    )
}



export default PostPreview;
