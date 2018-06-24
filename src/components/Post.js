import React, {Component} from 'react';
import Button from './Button'
import Comment from './Comment'
class Post extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
        };
    }
    showDescription  = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    };
    render(){
    const description = this.state.isShow && <p>{this.props.post.description}</p>;
        return (
            <div>
                <h3>{this.props.post.title}</h3>
                <p>Posted by {this.props.post.userName} <em> ({this.props.post.date.substring(0,10)})</em></p>
                {description}
                {this.state.isShow && <Comment  _id = {this.props.post._id} comments = {this.props.post.comments}/>}
                <Button className = "btn btn-primary" title = {this.state.isShow ? 'Hide':'Open'} onClick = {this.showDescription} />
            </div>
    )
    }
}
export default Post;