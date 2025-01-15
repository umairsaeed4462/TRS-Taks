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
        loadComponent: () => import('../features/users/users-events/users-events.component').then(m => m.UsersEventsComponent)
    },
    {
        path: 'user/join-events',
        loadComponent: () => import('../features/users/join-events/join-events.component').then(m => m.JoinEventsComponent)
    },
    {
        path: 'admin/events-list',
        loadComponent: () => import('../features/admin/events/events.component').then(m => m.EventsComponent)
    },
    {
        path: 'admin/role-permissions',
        loadComponent: () => import('../features/admin/role-permission/role-permission.component').then(m => m.RolePermissionComponent)
    },
    {
        path: 'admin/role-permissions/role-details',
        loadComponent: () => import('../features/admin/role-permission/user-details/user-details.component').then(m => m.UserDetailsComponent)
    },
    // {
    //     path: '**',
    //     redirectTo: 'dashboard',
    //     pathMatch: 'full'
    // }
    
]
