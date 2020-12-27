import React, { Fragment, useState } from 'react';
import "./ProjectCard.scss";
import { Pen, Trash } from 'react-bootstrap-icons';

export default function ProjectCard({ project, editProject }) {
  const [logoLoaded, setLogoLoaded] = useState(true);
  const [projectImageLoaded, setProjectImageLoaded] = useState(true);


  return (
    <div className="col-sm-4 d-flex mb-4">
      <div className="card position-relative projectCard w-100" >
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
        <div className="card-body d-flex align-items-start flex-wrap">
          <div className="w-100">
            <div className="row card-title align-items-start">
              {logoLoaded ? (
                <Fragment>
                  <div className="col-6">
                    <img className="img-fluid border" onError={() => setLogoLoaded(false)} src={project.logo} alt={project.title} />
                  </div>
                  <div className="col-6 d-flex flex-wrap pl-0">
                    <div className="w-100 h3 font-20 titleText">{project.title}</div>
                    <div className="row font-12 justify-content-between w-100">
                      <div className="col">
                        <span className="d-block text-dark text-bold">{project.totalExp || 0}</span>
                        <span className="text-secondary text-capitalize d-block whitespace-nowrap">years exp.</span>
                      </div>
                      <div className="col">
                        <span className="d-block text-dark text-bold">{project.totalProjects || 0}</span>
                        <span className="text-secondary d-block">Projects</span>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ) : (
                  <Fragment>
                    <div className="col-12 d-flex flex-wrap">
                      <div className="w-100 h3 font-20 titleText">{project.title}</div>
                      <div className="row font-12 justify-content-between w-100">
                        <div className="col">
                          <span className="d-block text-dark text-bold">{project.totalExp || 0}</span>
                          <span className="text-secondary text-capitalize d-block whitespace-nowrap">years exp.</span>
                        </div>
                        <div className="col">
                          <span className="d-block text-dark text-bold">{project.totalProjects || 0}</span>
                          <span className="text-secondary d-block">Projects</span>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )}

            </div>
            <p className="font-12 text-secondary">{project.desc}</p>
          </div>
          <div className="mt-auto">
            <h5 className="text-violate text-decoration-underline font-16 ">{project.title}</h5>
            {projectImageLoaded ? (<div className="position-relative d-flex">
              <div className="bg-black-gradient position-absolute p-2 d-flex flex-wrap flex-column justify-content-end" style={{ width: '100%', height: '100%' }}>
                <span className="font-weight-bold text-white d-block">{project.title}</span>
                <span className="text-white">{project.location}</span>
              </div>
              <img src={project.imgURL} onError={() => setProjectImageLoaded(false)} title={project.imgTitle} className="img-fluid rounded" />
            </div>) : ""}
          </div>
        </div>
      </div>
    </div>
  )
}
