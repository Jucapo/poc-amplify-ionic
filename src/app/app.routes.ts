import { Routes } from '@angular/router';
import { UserProfilePage } from './features/user-profile/user-profile.page';
import { AdminDashboardPage } from './features/admin-dashboard/admin-dashboard.page';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'profile',
    component: UserProfilePage,
  },
  {
    path: 'admin',
    component: AdminDashboardPage,
  },
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
