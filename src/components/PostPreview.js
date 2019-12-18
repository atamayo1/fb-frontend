import React from 'react';
import { Link } from 'react-router-dom';
import {Card} from "reactstrap";

function PostPreview({_id,title,content, cover}){
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
            </div>
        </Card>
    )
}



export default PostPreview;
