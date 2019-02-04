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
        const startCheckingKey = () => {
            const email = this.props.user.getBasicProfile().getEmail();
            const localPublicKey = storage.getItem('publicKey');

            const update = () => {

                fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/7p6a4g00/${btoa( email + '_1' )}/`, {
                    method: 'GET'
                })
                    .then(out => out.text())
                    .then( key1 => {
                        fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/7p6a4g00/${btoa( email + '_2' )}/`, {
                            method : 'GET'
                        })
                            .then( out2 => out2.text())
                            .then( key2 => {
                                let key = JSON.parse(key1).replace(/[@]/g, '/').replace(/[_]/g, '+').trim() + JSON.parse(key2).replace(/[@]/g, '/').replace(/[_]/g, '+').trim();

                                if (key === localPublicKey)
                                {
                                    console.log("keys check successful, you can chat safely");
                                }
                                else
                                {
                                    console.log('wtf???? FBI?? CIA??? ITS NOT UR PUBLIC KEY, GGWP!#242DELETE');
                                    clearInterval(window.chatUpdateIntervalId);
                                }
                            } )
                    });
            };

            this.props.dispatch( checkKeys(true) );

            clearInterval(window.chatUpdateIntervalId);

            return window.chatUpdateIntervalId = setInterval(update, 10000);
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

        startCheckingKey();
    }

    componentWillUpdate (nextProps) {

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