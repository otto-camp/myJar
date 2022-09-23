import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class EditPostButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Button variant="none">
        <FontAwesomeIcon icon={faComment} />
      </Button>
    );
  }
}
