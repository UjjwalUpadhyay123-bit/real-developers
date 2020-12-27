import { GET_PROJECTS, POST_PROJECT, PUT_PROJECT } from './../utils/constants';
const INITIAL_STATE = {
  projects: 'loading',
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      let project = [...action.data];
      return Object.assign({}, state, { projects: project });
      break;
    case POST_PROJECT:
      let projects = [...state.projects];
      projects.push(action.data);
      return Object.assign({}, state, { projects: [...projects] })
      break;
    case PUT_PROJECT:
      let stateProject = [...state.projects.slice(0, action.currentIndex),
      action.item,
      ...state.projects.slice(action.currentIndex)]
      return Object.assign({}, state, { projects: [...stateProject] })
      break;
    default:
      break;
  }
  return state;
}
export default reducer;