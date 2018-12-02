const getGoogleUser = () => window.auth2['currentUser'].get();

export const get = () => {};

export const post = ( props ) => {

    const googleUser = getGoogleUser();

    const data = {
        googleIdToken : googleUser['Zi']['id_token'],
        ...props
    };

    // f= just to see the name in Network panel during debug
    return fetch('https://midiana.lv:8086/?f=' + data.func, {
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
