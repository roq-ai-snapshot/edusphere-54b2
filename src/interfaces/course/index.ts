import { LearningPathInterface } from 'interfaces/learning-path';
import { ProgressReportInterface } from 'interfaces/progress-report';
import { StudentCourseInterface } from 'interfaces/student-course';
import { TeacherCourseInterface } from 'interfaces/teacher-course';
import { EducationalInstitutionInterface } from 'interfaces/educational-institution';

export interface CourseInterface {
  id?: string;
  name: string;
  educational_institution_id: string;
  learning_path?: LearningPathInterface[];
  progress_report?: ProgressReportInterface[];
  student_course?: StudentCourseInterface[];
  teacher_course?: TeacherCourseInterface[];
  educational_institution?: EducationalInstitutionInterface;
  _count?: {
    learning_path?: number;
    progress_report?: number;
    student_course?: number;
    teacher_course?: number;
  };
}
