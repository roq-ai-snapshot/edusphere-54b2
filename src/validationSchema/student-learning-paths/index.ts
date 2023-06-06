import * as yup from 'yup';

export const studentLearningPathValidationSchema = yup.object().shape({
  student_id: yup.string().nullable().required(),
  learning_path_id: yup.string().nullable().required(),
});
