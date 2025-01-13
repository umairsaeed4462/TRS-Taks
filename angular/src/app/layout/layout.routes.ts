import { Routes } from '@angular/router';

export const LayoutRoutes: Routes = [
    { path: '', redirectTo: 'user/events', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadComponent: () => import('../features/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'user/events',
        loadComponent: () => import('../features/users/users-events/users-events.component').then(m => m.UsersEventsComponent)
    },
    {
        path: 'user/join-events',
        loadComponent: () => import('../features/users/join-events/join-events.component').then(m => m.JoinEventsComponent)
    }
    
]
