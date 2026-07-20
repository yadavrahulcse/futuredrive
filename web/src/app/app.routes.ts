import { Routes } from '@angular/router';

import { AuthPageComponent } from './features/auth/auth-page.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { ExamAttemptComponent } from './features/student/exam-attempt.component';
import { ResultPageComponent } from './features/student/result-page.component';
import { StudentHomeComponent } from './features/student/student-home.component';

export const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'student', component: StudentHomeComponent },
  { path: 'student/attempt/:id', component: ExamAttemptComponent },
  { path: 'student/results/:id', component: ResultPageComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', redirectTo: '' }
];
