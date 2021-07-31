import React, { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";

import Loader from "./../components/Loader";
import FormContainer from "../components/FormContainer";

import { listArtDetails, updateArt } from "../actions/artActions";

import { ART_UPDATE_RESET } from "./../constants/artConstants";

const ArtEditScreen = ({ match, history }) => {
  const artId = match.params.id;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const artDetails = useSelector((state) => state.artDetails);
  const { loading, error, art } = artDetails;

  const artUpdate = useSelector((state) => state.artUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = artUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ART_UPDATE_RESET });
      history.push("/admin/artlist");
    } else {
      if (!art.name || art._id !== artId) {
        dispatch(listArtDetails(artId));
      } else {
        setName(art.name);
        setImage(art.image);
        setDescription(art.description);
      }
    }
  }, [successUpdate, dispatch, history, artId, art]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateArt({
        _id: artId,
        name,
        image,
        description,
      })
    );
  };

  return (
    <>
      <Link to="/admin/artlist" className="btn btn-light my-3">
        GoBack
      </Link>
      <FormContainer>
        <h1>Edit Art</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger"> {errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label> Name </Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label> Image </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image Url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                controlId="file"
                type="file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label> Description </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit">Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ArtEditScreen;
