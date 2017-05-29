import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
import '../theme/app.scss';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import {updateModelSuccess, updateModel} from './actions/model-actions';
import {event_subscribe} from './actions/external-event-actions';

import {ptform} from './mock/ptform-mock';
import {model} from './mock/billsBigOne';

module.exports = {
  renderComponent: renderComponent,
  go: go,
  test: test,
  setModel: setModel,
  subscribe: subscribe
}

export const store = configureStore({});

export function go(frf){
  //store.dispatch(updateModel(model))
  renderComponent(ptform);
}

export function renderComponent(frf) {
  ReactDOM.render(<App frf={frf} store={store} />, document.getElementById('root'));
  subscribe("FIELD_CHANGE",test_subscribe)
  subscribe("junk",test_subscribe2)
  subscribe("FIELD_CHANGE",test_subscribe2)
  //setTimeout(() => store.dispatch(updateModelSuccess({AMENDED:"HELLO",L1:12334,L2:343,L3:2435})),100)
}

export function test(){
  store.dispatch(updateModel(model))
}

export function setModel(obj){
  store.dispatch(updateModel(obj))
}

export function subscribe(type, func){
  store.dispatch(event_subscribe(type, func));
}

export function test_subscribe(){
  alert("hello world!")
}
export function test_subscribe2(){
  alert("hello other world!")
}
