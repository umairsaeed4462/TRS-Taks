import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'user/events',
                loadComponent: () => import('./features/users/users-events/users-events.component').then(m => m.UsersEventsComponent)
            },
            {
                path: 'user/join-events',
                loadComponent: () => import('./features/users/join-events/join-events.component').then(m => m.JoinEventsComponent)
            }
            
        ]
    }
];
