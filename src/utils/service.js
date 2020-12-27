import axios from 'axios';


const requestApi = {
  get: function (requestObject) {
    return axios.get(requestObject)
  },
  post: function (requestObject, data) {
    return axios.post(requestObject, data)
  },
  put: function (requestObject, data) {
    return axios.put(requestObject, data)
  },
  delete: function (requestObject) {
    return axios.delete(requestObject)
  }
}

export default requestApi