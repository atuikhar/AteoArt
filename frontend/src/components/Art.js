import React from "react";

import { Card } from "react-bootstrap";

import { Link } from "react-router-dom";

import Rating from "./Rating";

const Art = ({ art }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/art/${art._id}`}>
        <Card.Img src={art.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/art/${art._id}`}>
          <Card.Title as="div">
            <strong>{art.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={art.rating} text={`${art.numReviews} reviews`} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Art;
