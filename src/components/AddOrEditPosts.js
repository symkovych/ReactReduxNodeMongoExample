import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import { array, func } from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPost, deletePost } from '../actions/posts'

class AddOrEditPosts extends Component {
  constructor(props) {
    super(props);
    this.state = this.mapPropsToState(props);
  }

  mapPropsToState = (props) => {
    const { posts, match: { params } } = props;
    const { id } = params;
    const currentPost = posts.find((el) => {
      return el._id === id;
    });

    return currentPost || {
      title: '',
      description: ''
    };
  };

  componentWillReceiveProps(nextProps) {
    this.setState(this.mapPropsToState(nextProps))
  }

  save = () => {
    const { title, description, _id } = this.state;
    const { addPost } = this.props;

    addPost({ title, description, _id });
  };

  delete = () => {
    const {_id} = this.state;
    const { deletePost } = this.props;

    deletePost({_id});
  }

  onInputChange = (value, key) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { title, description, _id } = this.state;

    return (<div>
        <h1>{_id ? 'Edit' : 'Add'} Post</h1>
        <Input
            className = "input-group-text"
          onInputChange={(value) => {
            this.onInputChange(value, 'title')
          }}
          value={title}
        />
        <textarea
          className = "input-group-text"
          value={description}
          onChange={(e) => {
            this.onInputChange(e.currentTarget.value, 'description')
          }}
        />
        <Button
            className = "btn btn-success"
          title="Submit"
          onClick={this.save}
        />
        {_id && <Button
            className = "btn btn-danger"
            title = 'Delete'
            onClick={this.delete}
        />}
      </div>
    );
  }
}

AddOrEditPosts.propTypes = {
  posts: array.isRequired,
  addPost: func.isRequired
};

function mapStoreToProps(store) {
  return {
    posts: store.posts.items
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addPost,
    deletePost
  }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(AddOrEditPosts);