import { Routes } from '@angular/router';
import { roleAuthGuard } from '../core/guards/role-auth.guard';

export const LayoutRoutes: Routes = [
    
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {
        path: 'dashboard',
        loadComponent: () => import('../features/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'user/events',
        canActivate: [roleAuthGuard],
        loadComponent: () => import('../features/users/users-events/users-events.component').then(m => m.UsersEventsComponent)
    },
    {
        path: 'user/events/details',
        canActivate: [roleAuthGuard],
        loadComponent: () => import('../features/users/users-events/event-details/event-details.component').then(m => m.EventDetailsComponent)
    },
    {
        path: 'user/join-events/details',
        canActivate: [roleAuthGuard],
        loadComponent: () => import('../features/users/users-events/event-details/event-details.component').then(m => m.EventDetailsComponent)
    },
    
    {
        path: 'admin/events-list',
        canActivate: [roleAuthGuard],
        loadComponent: () => import('../features/admin/events/events.component').then(m => m.EventsComponent)
    },
    {
        path: 'admin/events-list/details',
        canActivate: [roleAuthGuard],
        loadComponent: () => import('../features/users/users-events/event-details/event-details.component').then(m => m.EventDetailsComponent)
    },
    {
        path: 'admin/role-permissions',
        canActivate: [roleAuthGuard],
        loadComponent: () => import('../features/admin/role-permission/role-permission.component').then(m => m.RolePermissionComponent)
    },
    {
        path: 'admin/role-permissions/role-details',
        canActivate: [roleAuthGuard],
        loadComponent: () => import('../features/admin/role-permission/user-details/user-details.component').then(m => m.UserDetailsComponent)
    },
    {
        path: 'user/join-events',
        canActivate: [roleAuthGuard],
        loadComponent: () => import('../features/users/join-events/join-events.component').then(m => m.JoinEventsComponent)
    },
    // {
    //     path: '**',
    //     redirectTo: 'dashboard',
    //     pathMatch: 'full'
    // }
    
]
