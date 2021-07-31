import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

import { listArtDetails, createArtReview } from "../actions/artActions";

import { ART_CREATE_REVIEW_RESET } from "../constants/artConstants";

const ArtScreen = ({ history, match }) => {
  const [rating, setRating] = useState("0");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const artDetails = useSelector((state) => state.artDetails);
  const { loading, error, art } = artDetails;

  const artReviewCreate = useSelector((state) => state.artReviewCreate);
  const { success: successArtReview, error: errorArtReview } = artReviewCreate;

  useEffect(() => {
    if (successArtReview) {
      alert("Review Submitted Successfully");
      setRating(0);
      setComment("");
      dispatch({ type: ART_CREATE_REVIEW_RESET });
    }

    dispatch(listArtDetails(match.params.id));
  }, [dispatch, match, successArtReview]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createArtReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={art.name} />
          <Row>
            <Col md={6}>
              <Image src={art.image} alt={art.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{art.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={art.rating}
                    text={`${art.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Description : {art.description}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>

              {art.reviews.length === 0 && <Message>No Review Yet</Message>}
              <ListGroup variant="flush">
                {art.reviews.map((review) => (
                  <ListGroup.Item>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Review</h2>
                  {errorArtReview && (
                    <Message variant="danger">{errorArtReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label> Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select..</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login"> SignIn</Link> To Write A Reveiw
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ArtScreen;
