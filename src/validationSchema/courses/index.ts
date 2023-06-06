import * as yup from 'yup';
import { learningPathValidationSchema } from 'validationSchema/learning-paths';
import { progressReportValidationSchema } from 'validationSchema/progress-reports';
import { studentCourseValidationSchema } from 'validationSchema/student-courses';
import { teacherCourseValidationSchema } from 'validationSchema/teacher-courses';

export const courseValidationSchema = yup.object().shape({
  name: yup.string().required(),
  educational_institution_id: yup.string().nullable().required(),
  learning_path: yup.array().of(learningPathValidationSchema),
  progress_report: yup.array().of(progressReportValidationSchema),
  student_course: yup.array().of(studentCourseValidationSchema),
  teacher_course: yup.array().of(teacherCourseValidationSchema),
});
