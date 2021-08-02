import axios from "axios";
import {
  ART_LIST_REQUEST,
  ART_LIST_SUCCESS,
  ART_LIST_FAILED,
  ART_DETAILS_REQUEST,
  ART_DETAILS_SUCCESS,
  ART_DETAILS_FAILED,
  ART_DELETE_REQUEST,
  ART_DELETE_SUCCESS,
  ART_DELETE_FAILED,
  ART_CREATE_REQUEST,
  ART_CREATE_SUCCESS,
  ART_CREATE_FAILED,
  ART_UPDATE_REQUEST,
  ART_UPDATE_SUCCESS,
  ART_UPDATE_FAILED,
  ART_CREATE_REVIEW_REQUEST,
  ART_CREATE_REVIEW_SUCCESS,
  ART_CREATE_REVIEW_FAILED,
} from "../constants/artConstants";

export const listArts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ART_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/arts?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: ART_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ART_LIST_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listArtDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ART_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/arts/${id}`);

    dispatch({
      type: ART_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ART_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteArt = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ART_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/arts/${id}`, config);

    dispatch({
      type: ART_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ART_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createArt = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ART_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/arts`, {}, config);

    dispatch({
      type: ART_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ART_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateArt = (art) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ART_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/arts/${art._id}`, art, config);

    dispatch({
      type: ART_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ART_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createArtReview =
  (artId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ART_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/arts/${artId}/reviews`, review, config);

      dispatch({
        type: ART_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ART_CREATE_REVIEW_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
