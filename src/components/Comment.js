import React, {Component} from 'react';
import Button from './Button'
import Input from './Input'
import {addComment, deleteComment, editComment} from '../actions/comments'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            editText: '',
            name: '',
            isEdit: false,
            activeCommentId: ''
        };
    }
    sendComment = () => {
        const {
            _id : postId,
            currentUser: {name},
            currentUser: {_id : userId},
            addComment
        } = this.props;
        const {text} = this.state;

        addComment({postId, name, text, userId});
    };
    deleteComment = (_id) => {
        const {deleteComment} = this.props;
        deleteComment({_id});
    };
    editComment = (_id, text) =>{
        this.setState({
            isEdit: !this.state.isEdit,
            activeCommentId: _id,
            editText: text
        });

    };
    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };
    sendEditComment = (_id, text) => {
        const { editComment } = this.props;
        this.setState({
            isEdit: !this.state.isEdit,
            activeCommentId: '',
            editText: ''
        });
        editComment({_id, text});
    };
    renderComments = (el) => {
        const { currentUser : {_id}} = this.props;
        const Buttons =
            <div>
                <Button title = 'Edit' onClick = {() => {return this.editComment(el._id,  el.text)}} className = 'btn-success'/>
                <Button title = 'Delete' onClick = {() => {return this.deleteComment(el._id)}} className = 'btn-danger'/>
            </div>;
        const edit = (this.state.isEdit && el._id === this.state.activeCommentId) ?
            <div>
                <Input value = {this.state.editText}
                       onInputChange={(value) => {
                           this.onInputChange(value, 'editText')
                       }}
                />
                <Button title = ">>>"
                        onClick = {() => {return this.sendEditComment(el._id, this.state.editText)}}
                        className = 'btn-primary'
                />
            </div> :
            <span id = {el._id}>{el.text}</span>;
            return (
                <li key={el._id}>
                    {el.name}->  {edit}
                    {el.userId == _id && Buttons }
                </li>
            )
    };
    render() {
        const {comments} = this.props;
        const { text } = this.state;
        return (
            <div>
                <hr/>
                <h4>Comments:</h4>
                <ul>
                    {comments.map(this.renderComments)}
                </ul>
                <Input
                    onInputChange={(value) => {
                        this.onInputChange(value, 'text')
                    }}
                    value={text}
                />
                <Button
                    title='Send comment'
                    className='btn btn-primary'
                    onClick={this.sendComment}
                />
            </div>
        )
    }
}

function mapStoreToProps(store) {
    return {
        currentUser: store.users.currentUser,
        posts: store.posts.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addComment,
        deleteComment,
        editComment
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(Comment);
