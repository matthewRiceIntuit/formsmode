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
import {unflatten} from './util/flatten';

module.exports = {
  renderComponent: renderComponent,
  go: go,
  test: test,
  test2: test2,
  setModel: setModel,
  subscribe: subscribe,
  _fieldList: _fieldList
}

export const store = configureStore({});
export const _fieldList = {};

export function go(frf){
  //store.dispatch(updateModel(model))
  renderComponent(ptform);
}

export function fieldList(binding)
{
  _fieldList[binding]=1;
}

export function renderComponent(frf) {
  ReactDOM.render(<App frf={frf} store={store} fieldList={fieldList} />, document.getElementById('root'));
}


export function test(){
  store.dispatch(updateModel(model))
}
export function test2(){
  model.ReturnData.IRS709[1].CurrentYearAllowableCredit = 5;
  store.dispatch(updateModel(model,_fieldList))

}

export function setModel(obj){
  store.dispatch(updateModel(obj,_fieldList))
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
