import axios from 'axios';
import queryString from 'query-string';
import { StudentLearningPathInterface } from 'interfaces/student-learning-path';
import { GetQueryInterface } from '../../interfaces';

export const getStudentLearningPaths = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/student-learning-paths${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStudentLearningPath = async (studentLearningPath: StudentLearningPathInterface) => {
  const response = await axios.post('/api/student-learning-paths', studentLearningPath);
  return response.data;
};

export const updateStudentLearningPathById = async (id: string, studentLearningPath: StudentLearningPathInterface) => {
  const response = await axios.put(`/api/student-learning-paths/${id}`, studentLearningPath);
  return response.data;
};

export const getStudentLearningPathById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/student-learning-paths/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteStudentLearningPathById = async (id: string) => {
  const response = await axios.delete(`/api/student-learning-paths/${id}`);
  return response.data;
};
