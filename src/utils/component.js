const getProp = (string, prop) => {
    // "#id.class$html"
    let propValue = "";

    if (string.indexOf(prop) > -1)
    {
        let leftString = string.substring(string.indexOf(prop) + 1);

        let end = leftString.match(/[#.$]/) ? leftString.match(/[#.$]/).index : leftString.length;

        propValue = leftString.substring(0, end);
    }

    return propValue;
};

const convertToDom = string => {
    // div#menu.wrapper$Menu
    const el   = document.createElement(string.split(/[.#$]/g)[0]);

    const tags = string.match(/[.#$]/g);

    if (tags && tags.length)
    {
        tags.map( tag => {
            switch (tag) {
                case "#":
                    el.setAttribute('id', getProp(string,'#'));
                    break;
                case ".":
                    el.setAttribute('class', getProp(string, '.'));
                    break;
                case "$":
                    el.innerHTML = getProp(string,'$');
                    break;
            }
        } );
    }

    return el;
};


export default class Component {
    constructor ( string, props ) {
        this.context        = convertToDom(string);
        this.subscribers    = [];

        if (props && Object.keys(props).length)
        {
            Object.keys(props).map( key => {
                this.context[key] = props[key];
            } );
        }

        return this;
    }

    observe ( component ) {
        if (arguments && arguments.length)
        {
            const args = [...arguments];

            args.map( component => {
                if (component && component instanceof Component)
                {
                    this.subscribers.push( component );
                    this.context.appendChild( component.context );
                }
            } );
        }

        return this;
    }

    renderer ( fn ) {
        if (fn && typeof fn === 'function')
        {
            this.__renderer = fn;
        }
    }

    render ( state ) {
        if (this.subscribers.length)
        {
            this.subscribers.map( subscriber => subscriber.__renderer( state, this ) );
        }

        this.__renderer( state, this );

        return this;
    }
}