import {
  UPDATE_MODEL_SUCCESS,
  UPDATE_FIELD_SUCCESS
} from './../constants/model-action-types';

export default function model(state = {}, action = {}) {
  switch (action.type) {
    case UPDATE_MODEL_SUCCESS:
      return Object.assign({}, state, action.payload);
    case UPDATE_FIELD_SUCCESS:
      state[action.binding] = action.value;
      return Object.assign({}, state, state);
    default:
      return state;
  }
}