import * as yup from 'yup';
import { courseValidationSchema } from 'validationSchema/courses';
import { studentValidationSchema } from 'validationSchema/students';
import { teacherValidationSchema } from 'validationSchema/teachers';

export const educationalInstitutionValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  course: yup.array().of(courseValidationSchema),
  student: yup.array().of(studentValidationSchema),
  teacher: yup.array().of(teacherValidationSchema),
});
