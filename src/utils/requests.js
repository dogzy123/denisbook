
export const get = () => {};

export const post = ( props ) => {

    return fetch('http://midiana.lv:8080/', {
        method  : "POST",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body    : JSON.stringify( props ),
    })
        .then( resp => {
            if (resp && resp.status === 200 && resp.statusText === "OK")
            {
                return resp.json();
            }
        } );

};

window.sendPost = post;
