import { StudentLearningPathInterface } from 'interfaces/student-learning-path';
import { CourseInterface } from 'interfaces/course';

export interface LearningPathInterface {
  id?: string;
  name: string;
  course_id: string;
  student_learning_path?: StudentLearningPathInterface[];
  course?: CourseInterface;
  _count?: {
    student_learning_path?: number;
  };
}
