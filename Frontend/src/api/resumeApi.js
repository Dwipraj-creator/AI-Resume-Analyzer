import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await API.post("/resume/analyze", formData);
  return response.data;
};

export const getReports = async () => {
  const response = await API.get("/resume/reports");
  return response.data;
};

export const deleteReport = async (id) => {
  const response = await API.delete(`/resume/reports/${id}`);
  return response.data;
};