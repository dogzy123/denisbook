import { Component } from "react";
import { connect } from "react-redux";

class Message extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={this.props.userMessage ? "pm-msg-right": "pm-msg-left"} >
                <div className="pm-msg">
                    <span>{this.props.data.author}</span>
                    <p>{this.props.data.msg}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentDialog : state.currentDialog
});

export default connect(mapStateToProps)(Message);