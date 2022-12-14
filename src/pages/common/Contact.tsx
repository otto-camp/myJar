import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import SEO from '../../utils/SEO/SEO';
import './style.css';
import image from '../../../public/logo.webp';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = async (formData: any) => {
    const errors: any = {};
    if (!formData.name) {
      errors.name = 'Please enter your name';
    }
    if (!formData.email) {
      errors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message) {
      errors.message = 'Please enter a message';
    }
    return errors;
  };
  //TODO:CREATE A FUNCTIONAL CONTACT PAGE.
  return (
    <>
      <SEO
        title="Contact Us | myJar"
        description="Have a question about your blog or profile?  Contact us 24 hours a day 7 days a week for the best customer service!"
        type="website"
        url="https://myjar-8ff23.web.app/contact"
        image={image}
      />
      <div className="min-h d-flex flex-column flex-wrap justify-content-center align-items-center">
        <h1 className="contact-title">Contact Us</h1>
        <Form className="contact-form">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">We will never share your email with anyone else.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Message</Form.Label>
            <Form.Control type="text" placeholder="Enter email" as="textarea" />
          </Form.Group>

          <Button variant="primary" className="px-auto p-2" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Contact;
