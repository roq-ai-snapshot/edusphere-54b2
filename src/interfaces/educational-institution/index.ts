import { CourseInterface } from 'interfaces/course';
import { StudentInterface } from 'interfaces/student';
import { TeacherInterface } from 'interfaces/teacher';
import { UserInterface } from 'interfaces/user';

export interface EducationalInstitutionInterface {
  id?: string;
  name: string;
  user_id: string;
  course?: CourseInterface[];
  student?: StudentInterface[];
  teacher?: TeacherInterface[];
  user?: UserInterface;
  _count?: {
    course?: number;
    student?: number;
    teacher?: number;
  };
}
