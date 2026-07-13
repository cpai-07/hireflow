import axios from "axios";

// commenting this to deploy it on cloud(testing purpose)
// const BASE_URL = "http://localhost:5000/api";

// changing URL to deploy it on cloud
const BASE_URL = "http://34.51.156.66:5000/api";

// candidates
export const getCandidates = (params) =>
  axios.get(`${BASE_URL}/candidates`, { params });
export const addCandidate = (data) =>
  axios.post(`${BASE_URL}/candidates`, data);
export const updateCandidate = (id, data) =>
  axios.put(`${BASE_URL}/candidates/${id}`, data);
export const deleteCandidate = (id) =>
  axios.delete(`${BASE_URL}/candidates/${id}`);

// department endpoint
export const getDepartments = () => axios.get(`${BASE_URL}/departments`);
export const addDepartment = (data) =>
  axios.post(`${BASE_URL}/departments`, data);
export const updateDepartment = (id, data) =>
  axios.put(`${BASE_URL}/departments/${id}`, data);
export const deleteDepartment = (id) =>
  axios.delete(`${BASE_URL}/departments/${id}`);

// role endpoint
export const getJobRoles = () => axios.get(`${BASE_URL}/jobroles`);
export const addJobRole = (data) => axios.post(`${BASE_URL}/jobroles`, data);
export const updateJobRole = (id, data) =>
  axios.put(`${BASE_URL}/jobroles/${id}`, data);
export const deleteJobRole = (id) => axios.delete(`${BASE_URL}/jobroles/${id}`);

// placement endpoint
export const getPlacements = () => axios.get(`${BASE_URL}/placements`);
export const addPlacement = (data) =>
  axios.post(`${BASE_URL}/placements`, data);
export const updatePlacement = (id, data) =>
  axios.put(`${BASE_URL}/placements/${id}`, data);
export const deletePlacement = (id) =>
  axios.delete(`${BASE_URL}/placements/${id}`);
