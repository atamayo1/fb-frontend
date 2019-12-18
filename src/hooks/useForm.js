import { useState, useEffect } from 'react';

function useForm(callback, current= {}){
    const [inputs, setInputs] = useState(current);

    useEffect(() => {
        if(current.getSinglePost){
            delete current.getSinglePost.__typename;
            setInputs({...current.getSinglePost})
        }
    },[current]);

    const handleSubmit = event => {
        if (event) event.preventDefault();
        callback(inputs).then(() => {
                window.location.reload();
        });
    };

    const handleInputChange = event => {
        event.persist();
        const { name, value } = event.target;
        setInputs(fields => ({ ...fields, [name]: value}));
    };

    return {
        inputs,
        handleInputChange,
        handleSubmit,
    }
}

export default useForm;
