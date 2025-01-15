import { Routes } from '@angular/router';
import { roleAuthGuard } from '../core/guards/role-auth.guard';

export const LayoutRoutes: Routes = [
    
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {
        path: 'dashboard',
        loadComponent: () => import('../features/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'events',
        loadComponent: () => import('../features/events/events.component').then(m => m.EventsComponent)
    },
    {
        path: 'events/details',
        loadComponent: () => import('../features/events/event-details/event-details.component').then(m => m.EventDetailsComponent)
    },
    {
        path: 'users',
        loadComponent: () => import('../features/users/users.component').then(m => m.RolePermissionComponent)
    },
    {
        path: 'users/details',
        loadComponent: () => import('../features/users/user-details/user-details.component').then(m => m.UserDetailsComponent)
    },
    {
        path: 'role-permissions',
        loadComponent: () => import('../features/role-permissions/role-permissions.component').then(m => m.RolePermissionsComponent)
    },
    {
        path: 'role-permissions/create',
        loadComponent: () => import('../features/role-permissions/create-role/create-role.component').then(m => m.CreateRoleComponent)
    }
    
]
