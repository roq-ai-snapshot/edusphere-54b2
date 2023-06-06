import { ParentInterface } from 'interfaces/parent';
import { StudentInterface } from 'interfaces/student';
import { TeacherInterface } from 'interfaces/teacher';

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roq_user_id: string;
  tenant_id: string;

  parent: ParentInterface[];
  student: StudentInterface[];
  teacher: TeacherInterface[];
}
