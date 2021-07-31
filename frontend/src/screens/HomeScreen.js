import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { listArts } from "../actions/artActions";

import Art from "../components/Art";

import Message from "../components/Message";
import Loader from "../components/Loader";

import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const artList = useSelector((state) => state.artList);

  const { loading, error, arts, page, pages } = artList;

  useEffect(() => {
    dispatch(listArts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {arts.map((art) => (
              <Col key={art._id} sm={12} md={6} lg={4} xl={3}>
                <Art art={art} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
