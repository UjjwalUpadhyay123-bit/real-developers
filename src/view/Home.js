import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import ProjectCard from '../components/projectCard/ProjectCard';
import { getProject, deleteProject, putProject } from './../redux/ProjectAction'
import { Pen, Trash } from 'react-bootstrap-icons';
import './Home.scss';

export default function Home() {
  const { projects } = useSelector(state => state.projectReducer);
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    if (projects === 'loading') {
      dispatch(getProject());
    }
  }, [projects]);

  const editProject = (e, id, type) => {

    e.preventDefault();
    if (type === 'delete') {
      dispatch(deleteProject(id))
    }
    if (type === 'edit') {
      history.push(`/edit/${id}`)
    }
  }

  return (
    <div className="container mt-5">
      {projects !== 'loading' && (<div className="row mb-5">
        <div className="col-sm-6">
          <h3 className="mb-1"><span className="text-secondary">Featured</span> <span className="text-dark">Developers</span></h3>
          <h5 className="text-secondary font-17">Prominent Developers in Bangalore</h5>
        </div>
        <div className="col-sm-6 text-sm-right">
          <Link className='btn bg-gradient text-white text-uppercase rounded-pill' to="/create">+ add new developer</Link>
        </div>
      </div>)}
      {/* projects grid start */}

      <div className="row">
        {projects === 'loading' && (<div className="text-center w-100"><div className="spinner-border " role="status">
          <span className="sr-only">Loading...</span>
        </div></div>)}
        {projects !== 'loading' && projects.length > 0 && projects.map(project => project.hasOwnProperty('developer') && project['developer'] !== '' ? (
          <ProjectCard
            editProject={editProject}
            key={project.id}
            project={project}
          />
        ) : '')}
      </div>
      {/* projects grid start */}
      <div className="row my-5">
        <div className="col-sm-6">
          <h3 className="mb-1"><span className="text-secondary">Trending</span> <span className="text-dark">Projects</span></h3>
          <h5 className="text-secondary font-17">Most sought-after projects in Bangalore</h5>
        </div>
        <div className="col-sm-6 text-sm-right">
        <Link className='btn bg-gradient text-white text-uppercase rounded-pill' to="/create">+ add new project</Link>
        </div>
      </div>
      <div className="row">
        {projects !== 'loading' && projects.length > 0 && projects.map(project => (!project.hasOwnProperty('developer') || project['developer'] === '' ? <div className="col-sm-4" key={project.id}>
          <div className="card mb-3 new-project-card">
            <div className="cardOverLay rounded position-absolute flex-column align-items-center justify-content-center">
              <span
                className="btn btn-light d-flex align-items-center bg-white rounded-pill mb-3 font-15 font-weight-bold navBtn p-1"
                onClick={(e) => editProject(e, project.id, "edit")}
              >
                <span className="iconBg rounded-circle d-flex justify-content-center align-items-center bg-primary text-white text-center font-12 mr-2">
                  <Pen />
                </span>
                Edit
              </span>
              <span
                className="btn btn-light d-flex align-items-center bg-white rounded-pill font-15 font-weight-bold navBtn p-1"
                onClick={(e) => {editProject(e, project.id, 'delete'); window.location.reload();}}
              >
                <span className="iconBg rounded-circle d-flex justify-content-center align-items-center text-white bg-violate text-center font-12 mr-2">
                  <Trash />
                </span>
                Delete
              </span>
            </div>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img className="card-img" src={project.imgURL} alt={project.imgTitle} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <h5 className="card-title">{project.totalExp}</h5>
                  <h5 className="card-title">{project.totalProjects}</h5>
                  <p className="card-text">{project.desc}</p>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>: ''))}
      </div>
    </div>
  )
}
