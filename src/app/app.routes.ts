import { CourseFormSmartComponent } from './course-form-smart/course-form-smart.component';
import { CoursesComponent } from './courses/courses.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'courses/edit',
    component: CourseFormSmartComponent,
  },
  {
    path: 'courses/edit/:courseID',
    component: CourseFormSmartComponent,
  },
  { path: '**', redirectTo: '/courses' },
];
