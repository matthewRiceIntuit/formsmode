import {
  UPDATE_MODEL_SUCCESS,
  UPDATE_FIELD_SUCCESS,
  ADD_FIELDLIST_SUCCESS
} from './../constants/model-action-types';
import {
  FIELD_CHANGE
} from './../constants/external-event-action-types';

import {flatten} from './../util/flatten';
import {fire_external_event} from './external-event-actions';


export function updateModelSuccess(frf) {
  return {
    type: UPDATE_MODEL_SUCCESS,
    payload: frf
  };
}




export function updateModel(frf,fields) {
  return (dispatch, getState) => {
    const flat = flatten(frf);
    for (var key in fields) {
      if(flat[key]){
        fields[key] = flat[key];
      } else{
        delete fields[key];
      }
    }
    dispatch(updateModelSuccess(fields));
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
    dispatch(fire_external_event(FIELD_CHANGE,{binding,value}));
  }
}



export function addFieldListSuccess(binding) {
  return {
    type: UPDATE_FIELD_SUCCESS,
    binding
  };
}


export function addFieldListBinding(binding){
  return (dispatch, getState) => {
    dispatch(addFieldListSuccess(binding));
  }
}

