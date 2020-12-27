import requestApi from './../utils/service';
import { GET_PROJECTS, POST_PROJECT, PUT_PROJECT } from './../utils/constants';
import { useHistory } from 'react-router-dom';

export function getProject() {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      requestApi.get('http://localhost:3000/items/').then(res => {
        dispatch({ type: GET_PROJECTS, data: res.data })
        resolve(res.data);
      }).catch(err => {
        console.log(err);
        reject(err);
      })
    })
  }

};
export function putProject(formObject, currentIndex) {
  return async (dispatch) => {
    let putObject = await requestApi.put('http://localhost:3000/items/'+formObject.id, formObject);
    if (putObject) {
      console.log('updated successfully');
      dispatch({ type: PUT_PROJECT, data: putObject.data, id: formObject.id, currentIndex })
    }
    window.history.go(-1);
  }
};
export function postProject(newObject) {
  return async (dispatch) => {
    let postObject = await requestApi.post('http://localhost:3000/items/', newObject)
    if (postObject) {   
      dispatch({ type: POST_PROJECT, data: postObject })
    }
  }
};
export function deleteProject(id) {
  return async (dispatch) => {
    let deleteObject = await requestApi.delete('http://localhost:3000/items/' + id);
    console.log('# ', deleteObject);
  }
}