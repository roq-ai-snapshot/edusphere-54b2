import { StudentInterface } from 'interfaces/student';
import { CourseInterface } from 'interfaces/course';

export interface ProgressReportInterface {
  id?: string;
  student_id: string;
  course_id: string;
  progress: number;

  student?: StudentInterface;
  course?: CourseInterface;
  _count?: {};
}
