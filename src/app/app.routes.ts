// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { UserProfilePage } from './pages/user-profile/user-profile.page';
import { AdminDashboardPage } from './pages/admin-dashboard/admin-dashboard.page';

export const routes: Routes = [
  // 1) Raíz redirige a /profile (o al que quieras por defecto)
  {
    path: '',
    redirectTo: 'profile',
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
