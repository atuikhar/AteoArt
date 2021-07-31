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
  ART_CREATE_RESET,
  ART_UPDATE_REQUEST,
  ART_UPDATE_SUCCESS,
  ART_UPDATE_FAILED,
  ART_UPDATE_RESET,
  ART_CREATE_REVIEW_REQUEST,
  ART_CREATE_REVIEW_SUCCESS,
  ART_CREATE_REVIEW_FAILED,
  ART_CREATE_REVIEW_RESET,
} from "../constants/artConstants";

export const artListReducer = (state = { arts: [] }, action) => {
  switch (action.type) {
    case ART_LIST_REQUEST:
      return { loading: true, arts: [] };
    case ART_LIST_SUCCESS:
      return {
        loading: false,
        arts: action.payload.arts,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ART_LIST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const artDetailsReducer = (state = { art: { reviews: [] } }, action) => {
  switch (action.type) {
    case ART_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ART_DETAILS_SUCCESS:
      return { loading: false, art: action.payload };
    case ART_DETAILS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const artDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ART_DELETE_REQUEST:
      return { loading: true };
    case ART_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ART_DELETE_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const artCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ART_CREATE_REQUEST:
      return { loading: true };
    case ART_CREATE_SUCCESS:
      return { loading: false, success: true, art: action.payload };
    case ART_CREATE_FAILED:
      return { loading: false, error: action.payload };
    case ART_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const artUpdateReducer = (state = { art: {} }, action) => {
  switch (action.type) {
    case ART_UPDATE_REQUEST:
      return { loading: true };
    case ART_UPDATE_SUCCESS:
      return { loading: false, success: true, art: action.payload };
    case ART_UPDATE_FAILED:
      return { loading: false, error: action.payload };
    case ART_UPDATE_RESET:
      return { art: {} };
    default:
      return state;
  }
};

export const artReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ART_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case ART_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case ART_CREATE_REVIEW_FAILED:
      return { loading: false, error: action.payload };
    case ART_CREATE_REVIEW_RESET:
      return { art: {} };
    default:
      return state;
  }
};
