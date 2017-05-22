import {
  UPDATE_MODEL_SUCCESS,
} from './../constants/model-action-types';

export function updateModelSuccess(frf) {
  return {
    type: UPDATE_MODEL_SUCCESS,
    payload: frf
  };
}



export function updateModel(frf) {
  debugger
  return (dispatch, getState) => {
    dispatch(updateModelSuccess(frf));
  }
}