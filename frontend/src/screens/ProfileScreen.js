import React, { useEffect, useState } from "react";

import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Message from "../components/Message";

import Loader from "./../components/Loader";

import { getUserDetails, updateUserProfile } from "../actions/userActions";

import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [dp, setDp] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setDp(user.dp);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

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
      setDp(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password Do Not Match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password, dp }));
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h2>{user.name} Profile</h2>
        {message && <Message variant="danger"> {message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {error && <Message variant="danger"> {error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label> Name </Form.Label>
            <Form.Control
              type="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label> Email Address </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="file">
            <Form.Control
              type="file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
            />
            {uploading && <Loader />}
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label> Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label> Confirm Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="text-center">
            <Button type="submit">Update</Button>
          </Form.Group>
        </Form>
      </Col>
      <Col md={6} className="mt-3">
        <Image src={user.dp} fluid className="dp" />
      </Col>
    </Row>
  );
};
export default ProfileScreen;
