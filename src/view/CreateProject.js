import React, { useState, useEffect } from 'react';
import './CreateProject.scss';
import { useSelector, useDispatch } from "react-redux";
import { postProject, putProject, getProject } from "./../redux/ProjectAction";
import { browserHistory } from 'react-router'

const formInitialValues = {
  logo: '',
  developer: '',
  totalExp: '',
  totalProjects: '',
  desc: '',
  title: '',
  location: '',
  imgURL: ''
}
export default function CreateProject({ match }) {
  const [formData, setFormData] = useState(formInitialValues);
  const [submitType, setSubmitType] = useState('create');
  const [editIndex, setIndex] = useState(-1);
  const { projects } = useSelector(state => state.projectReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (match.params.id) {
      let id = match.params.id;
      let currentIndex = -1;
      if (projects === 'loading') {
        dispatch(getProject()).then(res => {
          let filteredProject = res.filter((item, index) => {
            if (item.id === parseInt(id)) {
              currentIndex = index;
              return item;
            }
          })
          if (filteredProject.length > 0) {
            setEditForm(filteredProject[0], currentIndex)
          }
        })
      } else {
        let filteredProject = projects.filter((item, index) => {
          if (item.id === parseInt(id)) {
            currentIndex = index;
            return item;
          }
        })
        if (filteredProject.length > 0) {
          setEditForm(filteredProject[0], currentIndex)
        }
      }

    }
  }, [match.params.id])
  const setEditForm = (formObject, index) => {
    setSubmitType('edit')
    setFormData(formObject, index);
    setIndex(index);
  }
  const postFormData = (formData) => {
    dispatch(postProject(formData))
    setFormData(formInitialValues);
    window.history.go(-1);

  }
  const updateForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let formValues = { ...formData };
    formValues[name] = value;
    setFormData(formValues);
  }
  return (
    <div className="container createForm mt-5" style={{ maxWidth: '300px' }}>
      <h6><span className="text-secondary">Featured</span> <span className="text-dark">Developers</span></h6>
      <label className="form-control-label"> Developer Logo Image URL</label>
      <input type="text" onChange={updateForm} name="logo" value={formData['logo']} className="form-control form-rounded" />
      <label className="form-control-label"> Developer Name</label>
      <input type="text" name="developer" value={formData['developer']} onChange={updateForm} className="form-control form-rounded" />
      <label className="form-control-label"> Years of totalExp</label>
      <input type="text" name="totalExp" value={formData['totalExp']} onChange={updateForm} className="form-control form-rounded" />
      <label className="form-control-label"> Projects count</label>
      <input type="text" name="totalProjects" value={formData['totalProjects']} onChange={updateForm} className="form-control form-rounded" />
      <label className="form-control-label"> desc</label>
      <textarea name="desc" value={formData['desc']} onChange={updateForm} className="form-control form-rounded" rows="3"></textarea>
      <label className="form-control-label"> Project name</label>
      <input type="text" name="title" value={formData['title']} onChange={updateForm} className="form-control form-rounded" />
      <label className="form-control-label"> Project location</label>
      <input type="text" name="location" value={formData['location']} onChange={updateForm} className="form-control form-rounded" />
      <label className="form-control-label"> Project image URL</label>
      <input type="text" name="imgURL" value={formData['imgURL']} onChange={updateForm} className="form-control form-rounded" />
      <button type="button" className="btn btn-primary bg-gradient" onClick={() => submitType === 'create' ? postFormData(formData) : dispatch(putProject(formData, editIndex))}>UPDATE</button>
    </div >
  )
}
