import { Routes } from '@angular/router';

import { Dashboard } from './features/dashboard/dashboard';
import { CourseList } from './features/courses/course-list/course-list';
import { CourseDetails } from './features/courses/course-details/course-details';
import { AddCourse } from './features/courses/add-course/add-course';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'courses',
    component: CourseList
  },
  {
    path: 'courses/:id',
    component: CourseDetails
  },
  {
    path: 'add-course',
    component: AddCourse
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];