// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { UserProfilePage } from './pages/user-profile/user-profile.page';
import { AdminDashboardPage } from './pages/admin-dashboard/admin-dashboard.page';

export const routes: Routes = [
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
    path: 'tabs',
    loadComponent: () =>
      import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then(
            (m) => m.DashboardPage,
          ),
      },
      {
        path: 'prospects',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import(
                './pages/prospects/prospects-list/prospects-list.page'
              ).then((m) => m.ProspectsListPage),
          },
          {
            path: 'new',
            loadComponent: () =>
              import(
                './pages/prospects/create-prospect/create-prospect.page'
              ).then((m) => m.CreateProspectPage),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./pages/prospects/edit-prospect/edit-prospect.page').then(
                (m) => m.EditProspectPage,
              ),
          },
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'activity',
        loadComponent: () =>
          import('./pages/activity/activity.page').then((m) => m.ActivityPage),
      },
      {
        path: 'help',
        loadComponent: () =>
          import('./pages/help/help.page').then((m) => m.HelpPage),
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/user-profile/user-profile.page').then(
            (m) => m.UserProfilePage,
          ),
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
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
