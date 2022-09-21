import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default class UpdateProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: this.props.user.fname,
      lname: this.props.user.lname,
      about: this.props.user.about
    };
  }

  render() {
    return (
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={this.state.fname}
                id="fnameInput"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" id="lnameInput" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={255}
                id="aboutInput"
              />
            </Form.Group>
            <p className="float-end text-muted">/255</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.onHide()}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
