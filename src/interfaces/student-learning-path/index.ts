import { StudentInterface } from 'interfaces/student';
import { LearningPathInterface } from 'interfaces/learning-path';

export interface StudentLearningPathInterface {
  id?: string;
  student_id: string;
  learning_path_id: string;

  student?: StudentInterface;
  learning_path?: LearningPathInterface;
  _count?: {};
}
