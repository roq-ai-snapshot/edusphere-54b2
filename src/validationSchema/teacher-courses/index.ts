import * as yup from 'yup';

export const teacherCourseValidationSchema = yup.object().shape({
  teacher_id: yup.string().nullable().required(),
  course_id: yup.string().nullable().required(),
});
