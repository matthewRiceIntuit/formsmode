import {
  SUBSCRIBE_EVENT,
} from './../constants/external-event-action-types';
import {unflatten} from './../util/flatten';

export function event_subscribe(event_type, func) {
  return {
    type: SUBSCRIBE_EVENT,
    func: func,
    event_type: event_type
  };
}

export function fire_external_event(event_type, param){
  return (dispatch, getState) => {
    const events = getState().external_event.functions.filter( (data) => data.event_type === event_type);
    const model = {Return: unflatten( getState().model)};
    events.forEach((evnt)=> evnt.func(model));
  }
}



