import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addPost } from '../actions/posts'

class AddPost extends Component {
  state = {
    title: '',
    description: ''
  };

  save = () => {
    const { title, description } = this.state;
    const { addPost } = this.props;

    addPost({ title, description });
  };

  onInputChange = (value, key) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { title, description } = this.state;

    return (<div>
        <h1>Add Post</h1>
        <Input
          onInputChange={(value) => {
            this.onInputChange(value, 'title')
          }}
          value={title}
        />
        <textarea
          value={description}
          onChange={(e) => {
            this.onInputChange(e.currentTarget.value, 'description')
          }}
        />
        <Button className = "btn btn-success"
          title="Submit"
          onClick={this.save}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addPost
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(AddPost);