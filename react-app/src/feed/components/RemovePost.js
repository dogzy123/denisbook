import {Component} from "react";
import {post} from "../../requests";

export default class RemovePost extends Component {
    constructor (props) {
        super(props);

        this.onRemove = this.onRemove.bind(this);
    }

    onRemove () {
        post({func : 'deletePost', rowId: this.props.post.rowId});
    }

    render () {
        return (
            <div className="post-remove" onClick={this.onRemove}>⨯</div>
        );
    }
}