import { Routes } from '@angular/router';
import { UserProfilePage } from './features/user-profile/user-profile.page';
import { AdminDashboardPage } from './features/admin-dashboard/admin-dashboard.page';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: UserProfilePage,
  },
  {
    path: 'admin',
    component: AdminDashboardPage,
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.page').then(
        (m) => m.PrivacyPolicyPage,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
