import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import model from './../reducers/model-reducer';



export default function configureStore(initialState, config) {
  const reducers = combineReducers({
    model
  });

  const enhancer = compose(
    applyMiddleware(thunk.withExtraArgument(config)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );


  const store = createStore(reducers, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default) // eslint-disable-line global-require
    );
  }

  return store;
}
