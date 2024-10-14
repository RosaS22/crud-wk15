import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const SeasoningForm = ({ addSeasoning, updateSeasoning, selectedSeasoning }) => {
  const [seasoning, setSeasoning] = useState({ name: '', quantity: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedSeasoning) {
      setSeasoning(selectedSeasoning);
    } else {
      setSeasoning({ name: '', quantity: '' });
    }
  }, [selectedSeasoning]);

  const handleChange = (e) => {
    setSeasoning({ ...seasoning, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, addAnother = false) => {
    e.preventDefault();
    if (seasoning.name === '' || seasoning.quantity === '') {
      setError('Both fields are required.');
      return;
    }
    setError('');

    if (seasoning.id) {
      updateSeasoning(seasoning);
    } else {
      addSeasoning(seasoning);
    }

    // Reset form after submitting
    if (!addAnother) {
      setSeasoning({ name: '', quantity: '' });
    } else {
      setSeasoning({ name: '', quantity: '' }); // reset for new entry
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3>{seasoning.id ? 'Edit Seasoning' : 'Add New Seasoning'}</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={(e) => handleSubmit(e, false)}>
            <Form.Group className="mb-3">
              <Form.Label>Seasoning Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter seasoning name"
                value={seasoning.name}
                onChange={handleChange}
                isInvalid={!!error && seasoning.name === ''}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                value={seasoning.quantity}
                onChange={handleChange}
                isInvalid={!!error && seasoning.quantity === ''}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a quantity.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              {seasoning.id ? 'Update' : 'Add'} Seasoning
            </Button>{' '}
            <Button variant="secondary" onClick={(e) => handleSubmit(e, true)}>
              Save and Add Another
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SeasoningForm;
