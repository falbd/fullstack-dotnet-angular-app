import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WalksComponent } from './components/walks/walks.component';
import { RegionsComponent } from './components/regions/regions.component';
import { ImagesComponent } from './components/images/images.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], children: [
    { path: 'images', component: ImagesComponent, canActivate: [roleGuard], data: { expectedRoles: ['Writer'] } },
  ]},

  // Add/Edit Walk Routes
  { path: 'walks/add', component: WalksComponent, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Writer'] } },
  { path: 'walks/edit/:id', component: WalksComponent, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Writer'] } },

  // Add/Edit Region Routes
  { path: 'regions/add', component: RegionsComponent, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Writer'] } },
  { path: 'regions/edit/:id', component: RegionsComponent, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Writer'] } },

  // Add/Edit Images Routes
  { path: 'images/add', component: ImagesComponent, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Writer'] } },
  { path: 'images/edit/:id', component: ImagesComponent, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Writer'] } },

  // Default redirect
  {
    path: 'region-management',
    loadComponent: () => import('./components/region-management/region-management.component').then(m => m.RegionComponent)
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
