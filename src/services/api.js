import axios from "axios";

// Base URL for backend API
const API_URL = "/api";

// Get all quiz questions
export const getQuestions = () => {
  return axios.get(`${API_URL}/questions`);
};

// Post quiz results
export const saveQuizResult = (data) => {
  return axios.post(`${API_URL}/results`, data);
};
