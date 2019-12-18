import { ApolloClient } from "apollo-client";
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const API_URL = 'https://back-fb.herokuapp.com/';

const httpLink = createUploadLink({
    uri: API_URL
});

const authLink = setContext((_,{ headers }) => {
    const token = localStorage.getItem('blogToken');
    const context  = {
        headers: {
            ...headers,
        }
    };
    if(token){
        context.headers['authorization'] = `JWT ${token}`;
        return context;
    }
});

export default new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
