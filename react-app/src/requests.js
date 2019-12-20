import {setError} from "./actions/actions";

const getGoogleUser = () => window.auth2['currentUser'].get();

export const get = () => {};

export const post = ( props ) => {

    const googleUser = getGoogleUser();

    const data = {
        googleIdToken : googleUser['Zi']['id_token'],
        ...props
    };

    // f= just to see the name in Network panel during debug
    return fetch('https://klesun-productions.com:8086/?f=' + data.func, {
        method  : "POST",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body    : JSON.stringify( data ),
    })
        .then( resp => {
            if (resp)
            {
                return resp.json();
            }

            throw Error("Something bad is happening with server.");
        } )
        .then( resp => {
            if (resp.error || !resp.hasOwnProperty('message'))
            {
                if (props.hasOwnProperty('componentDispatch'))
                {
                    const error = {
                        isError: true,
                        errorMsg: resp.error || "Something went wrong :/"
                    };

                    props.componentDispatch(setError(error));

                    return Promise.reject(resp.error);
                }
            }

            return resp;
        } )
        .catch(e => {
            console.error(e);
        });

};
