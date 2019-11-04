import { createStore, combineReducers } from 'redux';
import posts from './postsRedux';

const rootReducer = combineReducers({
    posts,
});

const store = createStore(rootReducer);

export default store;