import { Component } from "react";
import { connect } from "react-redux";

class Message extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="pm-msg-right" >
                <div className="pm-msg">
                    <span>{this.props.data.author}</span>
                    <p>{this.props.data.message}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentDialog : state.currentDialog
});

export default connect(mapStateToProps)(Message);