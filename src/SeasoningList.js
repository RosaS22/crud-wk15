import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

const SeasoningList = ({ seasonings, deleteSeasoning, setSelectedSeasoning }) => {
  return (
    <Container>
      <h2>Seasonings</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {seasonings.map(seasoning => (
          <Col key={seasoning.id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{seasoning.name}</Card.Title>
                <Card.Text>
                  Quantity: {seasoning.quantity}
                </Card.Text>
                <Button variant="outline-secondary" size="sm" onClick={() => setSelectedSeasoning(seasoning)}>
                  Edit
                </Button>{' '}
                <Button variant="outline-danger" size="sm" onClick={() => deleteSeasoning(seasoning.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SeasoningList;
