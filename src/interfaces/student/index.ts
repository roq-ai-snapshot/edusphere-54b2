import { ParentInterface } from 'interfaces/parent';
import { ProgressReportInterface } from 'interfaces/progress-report';
import { StudentCourseInterface } from 'interfaces/student-course';
import { StudentLearningPathInterface } from 'interfaces/student-learning-path';
import { UserInterface } from 'interfaces/user';
import { EducationalInstitutionInterface } from 'interfaces/educational-institution';

export interface StudentInterface {
  id?: string;
  user_id: string;
  educational_institution_id: string;
  parent?: ParentInterface[];
  progress_report?: ProgressReportInterface[];
  student_course?: StudentCourseInterface[];
  student_learning_path?: StudentLearningPathInterface[];
  user?: UserInterface;
  educational_institution?: EducationalInstitutionInterface;
  _count?: {
    parent?: number;
    progress_report?: number;
    student_course?: number;
    student_learning_path?: number;
  };
}
