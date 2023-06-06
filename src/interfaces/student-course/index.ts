import { StudentInterface } from 'interfaces/student';
import { CourseInterface } from 'interfaces/course';

export interface StudentCourseInterface {
  id?: string;
  student_id: string;
  course_id: string;

  student?: StudentInterface;
  course?: CourseInterface;
  _count?: {};
}
