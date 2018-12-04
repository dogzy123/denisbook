import { Component } from "react";
import { connect } from "react-redux";
import CryptHelper from "../../utils/CryptHelper";
import md5 from "md5";

const storage = window.localStorage;

class Body extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        clearInterval(window.chatUpdateIntervalId);

        const startCheckingKey = () => {
            const localPublicKey = storage.getItem('publicKey');
            const publicKeyMD5 = md5(localPublicKey);

            const update = () => {

                fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/7p6a4g00/${btoa( this.props.user.getBasicProfile().getEmail() )}/${publicKeyMD5}`, {
                    method: 'GET'
                })
                    .then(out => out.text())
                    .then(txt => {
                        if (JSON.parse(txt) === publicKeyMD5)
                        {
                            console.log('keys are identical, start chatting :)');
                        }
                        else
                        {
                            console.log('wtf???? FBI?? CIA??? ITS NOT UR PUBLIC KEY, GGWP!#242DELETE');
                            clearInterval(window.chatUpdateIntervalId);
                        }
                    });
            };

            return window.chatUpdateIntervalId = setInterval(update, 1024);
        };

        if (this.props.currentDialog)
        {
            if (!storage.getItem('publicKey') || storage.getItem('publicKey').length < 1)
            {
               CryptHelper.generateKey().then( keys => {
                   const publicKey  = btoa( String.fromCharCode( ...new Uint8Array(keys['publicKey']) ));
                   const privateKey = btoa( String.fromCharCode( ...new Uint8Array(keys['privateKey']) ));

                   storage.setItem('publicKey', publicKey);
                   storage.setItem('privateKey',  privateKey );

                   fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/7p6a4g00/${btoa( this.props.user.getBasicProfile().getEmail() )}/${md5(publicKey)}`, {method: 'POST'})
                       .then(out => console.log(out))
                       .then( () => startCheckingKey());
               } );
            }
            else
            {
                startCheckingKey();
            }

        }

        return (
            <div className="pm-messages">

            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentDialog : state.currentDialog,
    currentDialogMessages : state.currentDialogMessages,
    user : state.user
});

export default connect(mapStateToProps)(Body);