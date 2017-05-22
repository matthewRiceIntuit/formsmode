import {
  UPDATE_MODEL_SUCCESS,
} from './../constants/model-action-types';

export default function model(state = {}, action = {}) {
  switch (action.type) {
    case UPDATE_MODEL_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}