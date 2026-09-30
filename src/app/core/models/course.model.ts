export type CourseStatus = 'Completed' | 'In Progress' | 'Not Started';

export interface Course {
  id: number;
  name: string;
  description: string;
  duration: number;
  lessons: number;
  status: CourseStatus;
}