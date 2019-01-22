import { Component } from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import CryptHelper from "../../utils/CryptHelper";
import {checkKeys, currentDialogPublicKey, setKeys, setMyMessages} from "../../actions/actions";

const storage = window.localStorage;

class Body extends Component {
    constructor (props) {
        super(props)
    }

    componentDidMount () {
        if (storage.getItem('myMessages') && storage.getItem('myMessages').length > 3)
        {
            this.props.dispatch( setMyMessages(JSON.parse( storage.getItem('myMessages')) ) );
        }
    }

    componentWillUpdate (nextProps) {
        const startCheckingKey = () => {
            const email = nextProps.user.getBasicProfile().getEmail();
            const localPublicKey = storage.getItem('publicKey');

            const localPublicKeyParted1 = localPublicKey.substring(0, localPublicKey.length / 2).replace(/[/]/g, '@').replace(/[+]/g, '_');
            const localPublicKeyParted2 = localPublicKey.substring(localPublicKey.length / 2, localPublicKey.length).replace(/[/]/g, '@').replace(/[+]/g, '_');

            const update = () => {

                fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/7p6a4g00/${btoa( email + '_1' )}/${localPublicKeyParted1}`, {
                    method: 'GET'
                })
                    .then(out => out.text())
                    .then( key1 => {
                        if (JSON.parse(key1) === localPublicKeyParted1)
                        {
                            fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/7p6a4g00/${btoa( email + '_2' )}/${localPublicKeyParted2}`, {
                                method : 'GET'
                            })
                                .then( out2 => out2.text())
                                .then( key2 => {
                                    if (JSON.parse(key2) === localPublicKeyParted2)
                                    {
                                        console.log("keys check successful, you can chat safely");
                                    }
                                    else
                                    {
                                        console.log('wtf???? FBI?? CIA??? ITS NOT UR PUBLIC KEY, GGWP!#242DELETE');
                                        clearInterval(window.chatUpdateIntervalId);
                                    }
                                } )
                        }
                        else
                        {
                            console.log('wtf???? FBI?? CIA??? ITS NOT UR PUBLIC KEY, GGWP!#242DELETE');
                            clearInterval(window.chatUpdateIntervalId);
                        }
                    });
            };

            nextProps.dispatch( checkKeys(true) );

            clearInterval(window.chatUpdateIntervalId);

            return window.chatUpdateIntervalId = setInterval(update, 1024);
        };

        if (nextProps.currentDialog)
        {
            fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/7p6a4g00/${btoa( nextProps.currentDialog.email + '_1' )}/`, {
                method: 'GET'
            })
                .then(out => out.text())
                .then( key1 => {
                    if (key1)
                    {
                        fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/7p6a4g00/${btoa( nextProps.currentDialog.email + '_2' )}/`, {
                            method : 'GET'
                        })
                            .then( out2 => out2.text())
                            .then( key2 => {
                                this.props.dispatch( currentDialogPublicKey( JSON.parse(key1) + JSON.parse(key2) ) );
                            } )
                    }
                });

            if (!storage.getItem('publicKey') || storage.getItem('publicKey').length < 1)
            {
                CryptHelper.generateKey().then( keys => {
                    const email      = nextProps.user.getBasicProfile().getEmail();
                    const publicKey  = btoa( String.fromCharCode( ...new Uint8Array(keys['publicKey']) ));
                    const privateKey = btoa( String.fromCharCode( ...new Uint8Array(keys['privateKey']) ));

                    nextProps.dispatch( setKeys({publicKey, privateKey}) );

                    const partedKey1 = publicKey.substring(0, publicKey.length / 2).replace(/[/]/g, '@').replace(/[+]/g, '_');
                    const partedKey2 = publicKey.substring(publicKey.length / 2, publicKey.length).replace(/[/]/g, '@').replace(/[+]/g, '_');

                    storage.setItem('publicKey', publicKey);
                    storage.setItem('privateKey',  privateKey);

                    fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/7p6a4g00/${ btoa( email + '_1') }/${partedKey1}`, {method: 'POST'})
                        .then( response => {
                            if (response.status === 200)
                            {
                                fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/7p6a4g00/${ btoa( email + '_2') }/${partedKey2}`, {method: 'POST'})
                                    .then( response2 => {
                                        if (response2.status === 200)
                                        {
                                            startCheckingKey()
                                        }
                                    } )
                            }
                        })
                } );
            }
            else
            {
                const publicKey     = storage.getItem('publicKey');
                const privateKey    = storage.getItem('privateKey');

                nextProps.dispatch( setKeys({publicKey, privateKey}) );

                if (!nextProps.keysChecking)
                {
                    startCheckingKey();
                }
            }

        }
    }

    render () {
        return (
            <div className="pm-messages">
                <Messages/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentDialog : state.currentDialog,
    currentDialogMessages : state.currentDialogMessages,
    user : state.user,
    keysChecking : state.keysChecking
});

export default connect(mapStateToProps)(Body);