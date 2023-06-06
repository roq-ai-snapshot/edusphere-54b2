import { TeacherInterface } from 'interfaces/teacher';
import { CourseInterface } from 'interfaces/course';

export interface TeacherCourseInterface {
  id?: string;
  teacher_id: string;
  course_id: string;

  teacher?: TeacherInterface;
  course?: CourseInterface;
  _count?: {};
}
