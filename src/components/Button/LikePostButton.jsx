import React, { Component } from 'react';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { arrayRemove, arrayUnion, doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

export default class LikePostButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: props.post.pid,
      postLike: props.post.likes,
      currentUser: props.user,
      variant: 'none',
      isLiked: false
    };
  }

  componentDidMount() {
    if (this.state.currentUser.likedPosts.includes(this.state.postId)) {
      this.setState({ isLiked: true, variant: 'primary' });
    } else {
      this.setState({ isLiked: false });
    }
  }

  handleLike = async () => {
    if (this.state.isLiked) {
      await updateDoc(doc(db, 'posts', this.state.postId), { likes: increment(-1) })
        .then(() => {
          this.setState({
            postLike: this.state.postLike - 1,
            isLiked: false,
            variant: 'none'
          });
        })
        .then(async () => {
          await updateDoc(doc(db, 'profile', this.state.currentUser.id), {
            likedPosts: arrayRemove(this.state.postId)
          });
        });
    } else {
      await updateDoc(doc(db, 'posts', this.state.postId), { likes: increment(1) })
        .then(() => {
          this.setState({
            postLike: this.state.postLike + 1,
            isLiked: true,
            variant: 'primary'
          });
        })
        .then(async () => {
          await updateDoc(doc(db, 'profile', this.state.currentUser.id), {
            likedPosts: arrayUnion(this.state.postId)
          });
        });
    }
  };

  render() {
    return (
      <Button variant={this.state.variant} onClick={this.handleLike} className="me-3 font-13">
        <FontAwesomeIcon icon={faThumbsUp} className="me-1" />
        {this.state.postLike}
      </Button>
    );
  }
}
