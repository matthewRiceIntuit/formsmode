import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
import '../theme/app.scss';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import {updateModelSuccess} from './actions/model-actions';


import {ptform} from './mock/ptform-mock.js';


module.exports = {
  renderComponent: renderComponent,
  go: go,
  test: test,
  setModel: setModel
}

export const store = configureStore({});

export function go(){
  store.dispatch(updateModelSuccess({L1:123244,L2:2323,L3:655,L18:100}))
  renderComponent(ptform);
}

export function renderComponent(frf) {
  ReactDOM.render(<App frf={frf} store={store} />, document.getElementById('root'));
  //setTimeout(() => store.dispatch(updateModelSuccess({AMENDED:"HELLO",L1:12334,L2:343,L3:2435})),100)
}

export function test(){
  store.dispatch(updateModelSuccess({L1:123244}))
}

export function setModel(obj){
  store.dispatch(updateModelSuccess(obj))
}

go()