import axios from 'axios';
import queryString from 'query-string';
import { TeacherCourseInterface } from 'interfaces/teacher-course';
import { GetQueryInterface } from '../../interfaces';

export const getTeacherCourses = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/teacher-courses${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTeacherCourse = async (teacherCourse: TeacherCourseInterface) => {
  const response = await axios.post('/api/teacher-courses', teacherCourse);
  return response.data;
};

export const updateTeacherCourseById = async (id: string, teacherCourse: TeacherCourseInterface) => {
  const response = await axios.put(`/api/teacher-courses/${id}`, teacherCourse);
  return response.data;
};

export const getTeacherCourseById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/teacher-courses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTeacherCourseById = async (id: string) => {
  const response = await axios.delete(`/api/teacher-courses/${id}`);
  return response.data;
};
