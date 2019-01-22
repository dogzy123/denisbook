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
        const sendKeyToService = key => {
            const partedKey1 = key.substring(0, key.length / 2).replace(/[/]/g, '@').replace(/[+]/g, '_');
            const partedKey2 = key.substring(key.length / 2, key.length).replace(/[/]/g, '@').replace(/[+]/g, '_');

            fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/7p6a4g00/${ btoa( this.props.user.getBasicProfile().getEmail() + '_1') }/${partedKey1}`, {method: 'POST'})
                .then( response => {
                    if (response.status === 200)
                    {
                        fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/7p6a4g00/${ btoa( this.props.user.getBasicProfile().getEmail() + '_2') }/${partedKey2}`, {method: 'POST'})
                            .then( response2 => {
                                if (response2.status === 200)
                                {
                                    console.log('VALUES SENT SUCCESSFULLY!');
                                }
                            } )
                    }
                })
        };

        if (storage.getItem('myMessages') && storage.getItem('myMessages').length > 3)
        {
            this.props.dispatch( setMyMessages(JSON.parse( storage.getItem('myMessages')) ) );
        }

        if (!storage.getItem('privateKey') || !storage.getItem('publicKey'))
        {
            CryptHelper.generateKeyB64()
                .then( ({privateKeyB64, publicKeyB64}) => {
                    storage.setItem('publicKey', publicKeyB64);
                    storage.setItem('privateKey',  privateKeyB64);

                    sendKeyToService(publicKeyB64);

                    this.props.dispatch( setKeys({publicKeyB64, privateKeyB64}) );
                } )
        }
        else
        {
            sendKeyToService( storage.getItem('publicKey') );
            this.props.dispatch( setKeys({publicKeyB64: storage.getItem('publicKey'), privateKeyB64: storage.getItem('privateKey')}) );
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
                                let key = JSON.parse(key1).replace(/[@]/g, '/').replace(/[_]/g, '+').trim() + JSON.parse(key2).replace(/[@]/g, '/').replace(/[_]/g, '+').trim();

                                this.props.dispatch( currentDialogPublicKey( key ) );
                            } )
                    }
                });

            /*if (!storage.getItem('publicKey') || storage.getItem('publicKey').length < 1)
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
            }*/

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