import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { Provider} from "react-redux"
import { applyMiddleware, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import { getPosts } from './actions/post.action';
import { AuthProvider } from './context/AuthProvider';




const store= createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
store.dispatch(getPosts())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <AuthProvider>
    <App />
    </AuthProvider>
    </Provider>
);