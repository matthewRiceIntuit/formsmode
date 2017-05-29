import {
  SUBSCRIBE_EVENT,
} from './../constants/external-event-action-types';


export default function external_event(state = {functions:[]}, action = {}) {
  switch (action.type) {
    case SUBSCRIBE_EVENT:
      state.functions.push({ func: action.func, event_type: action.event_type })
      return Object.assign({}, state, {functions:state.functions});
    default:
      return state;
  }
}