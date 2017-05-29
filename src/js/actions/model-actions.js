import {
  UPDATE_MODEL_SUCCESS,
  UPDATE_FIELD_SUCCESS
} from './../constants/model-action-types';
import {
  FIELD_CHANGE
} from './../constants/external-event-action-types';

import {flatten, unflatten} from './../util/flatten';
import {fire_external_event} from './external-event-actions';


export function updateModelSuccess(frf) {
  return {
    type: UPDATE_MODEL_SUCCESS,
    payload: frf
  };
}




export function updateModel(frf) {
  return (dispatch, getState) => {
    dispatch(updateModelSuccess(flatten(frf)));
  }
}

export function updateFieldSuccess(binding, value) {
  return {
    type: UPDATE_FIELD_SUCCESS,
    binding,
    value
  };
}


export function setDataVal(binding, value){
  console.log(`setDataVal( ${binding}, ${value}`)
  return (dispatch, getState) => {
    dispatch(updateFieldSuccess(binding, value));
    dispatch(fire_external_event(FIELD_CHANGE,unflatten(getState().model)));
  }
}

