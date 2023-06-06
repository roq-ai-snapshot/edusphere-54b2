import * as yup from 'yup';

export const progressReportValidationSchema = yup.object().shape({
  progress: yup.number().integer().required(),
  student_id: yup.string().nullable().required(),
  course_id: yup.string().nullable().required(),
});
