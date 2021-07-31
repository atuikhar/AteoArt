import React, { useEffect } from "react";

import { LinkContainer } from "react-router-bootstrap";

import { Button, Table, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";

import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

import { listArts, deleteArt, createArt } from "../actions/artActions";

import { ART_CREATE_RESET } from "../constants/artConstants";

const ArtListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const artList = useSelector((state) => state.artList);

  const { loading, error, arts, page, pages } = artList;

  const artDelete = useSelector((state) => state.artDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = artDelete;

  const artCreate = useSelector((state) => state.artCreate);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    art: createdArt,
  } = artCreate;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: ART_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/art/${createdArt._id}/edit`);
    } else {
      dispatch(listArts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdArt,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteArt(id));
    }
  };

  const createArtHandler = () => {
    dispatch(createArt());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Arts</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createArtHandler}>
            <i className="fas fa-plus">Create Art</i>
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger"> {errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger"> {errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm text-dark"
            variant="dark"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {arts.map((art) => (
                <tr key={art._id}>
                  <td>{art._id}</td>
                  <td>{art.name}</td>
                  <td>
                    <LinkContainer to={`/admin/art/${art._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(art._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ArtListScreen;
