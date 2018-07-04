import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {array} from 'prop-types'
import Button from './Button'
import Post from './Post'
import {getPosts} from '../actions/posts'

class Posts extends Component {
    componentDidMount() {
        const {getPosts} = this.props;
        getPosts();
    }

    redirectToPost = (id) => {
        const {history} = this.props;
        history.push(`/posts/${id}`);
    };

    renderPost = (el) => {
        const {currentUser} = this.props;
        const Edit = el.userId === currentUser._id &&
            <Button className="btn btn-success" title='Edit' onClick={() => {
                return this.redirectToPost(el._id)
            }}/>;

        return (
            <li key={el._id}>
                <Post post={el}
                      currentUser={currentUser.name}
                />
                {Edit}
                <hr/>
            </li>
        );
    };

    render() {
        const {posts} = this.props;

        return (<div>
            <h1>All posts</h1>
            <ul>
                {posts.map(this.renderPost)}
            </ul>
        </div>);
    }
}

Posts.propTypes = {
    posts: array.isRequired
};

function mapStoreToProps(store) {
    return {
        currentUser: store.users.currentUser,
        posts: store.posts.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPosts
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(Posts);