import * as yup from 'yup';
import { teacherCourseValidationSchema } from 'validationSchema/teacher-courses';

export const teacherValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  educational_institution_id: yup.string().nullable().required(),
  teacher_course: yup.array().of(teacherCourseValidationSchema),
});
