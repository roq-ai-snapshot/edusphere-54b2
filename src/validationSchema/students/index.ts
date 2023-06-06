import * as yup from 'yup';
import { parentValidationSchema } from 'validationSchema/parents';
import { progressReportValidationSchema } from 'validationSchema/progress-reports';
import { studentCourseValidationSchema } from 'validationSchema/student-courses';
import { studentLearningPathValidationSchema } from 'validationSchema/student-learning-paths';

export const studentValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  educational_institution_id: yup.string().nullable().required(),
  parent: yup.array().of(parentValidationSchema),
  progress_report: yup.array().of(progressReportValidationSchema),
  student_course: yup.array().of(studentCourseValidationSchema),
  student_learning_path: yup.array().of(studentLearningPathValidationSchema),
});
