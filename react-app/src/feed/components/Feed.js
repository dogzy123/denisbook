import {Component} from "react";
import AddPosts from "./AddPosts";
import Posts from "./Posts";

class Feed extends Component {
    render () {
        return (
            <div className="main-app">
                <AddPosts/>
                <Posts />
            </div>
        );
    }
}

export default Feed;