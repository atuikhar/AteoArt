import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form className="d-flex m-1" onSubmit={submitHandler}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button className="p-2" type="submit" variant="outline-success">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
