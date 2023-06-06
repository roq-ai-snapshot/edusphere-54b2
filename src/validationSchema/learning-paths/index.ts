import * as yup from 'yup';
import { studentLearningPathValidationSchema } from 'validationSchema/student-learning-paths';

export const learningPathValidationSchema = yup.object().shape({
  name: yup.string().required(),
  course_id: yup.string().nullable().required(),
  student_learning_path: yup.array().of(studentLearningPathValidationSchema),
});
