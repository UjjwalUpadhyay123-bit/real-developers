import { combineReducers } from 'redux';
import projectReducer from './project.reducer';

const rootReducer = combineReducers({
  projectReducer: projectReducer
});

export default rootReducer;