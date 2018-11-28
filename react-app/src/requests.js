import {store} from "./store";

const getGoogleUser = () => store.getState()['user'];

export const get = () => {};

export const post = ( props ) => {

    const googleUser = getGoogleUser();

    const data = {
        googleIdToken : googleUser['Zi']['id_token'],
        ...props
    };

    return fetch('https://midiana.lv:8086//', {
        method  : "POST",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body    : JSON.stringify( data ),
    })
        .then( resp => {
            if (resp && resp.status === 200 && resp.statusText === "OK")
            {
                return resp.json();
            }
        } );

};

window.sendPost = post;
