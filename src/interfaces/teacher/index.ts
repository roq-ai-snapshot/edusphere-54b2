import { TeacherCourseInterface } from 'interfaces/teacher-course';
import { UserInterface } from 'interfaces/user';
import { EducationalInstitutionInterface } from 'interfaces/educational-institution';

export interface TeacherInterface {
  id?: string;
  user_id: string;
  educational_institution_id: string;
  teacher_course?: TeacherCourseInterface[];
  user?: UserInterface;
  educational_institution?: EducationalInstitutionInterface;
  _count?: {
    teacher_course?: number;
  };
}
