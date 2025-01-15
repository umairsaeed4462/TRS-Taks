import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { LayoutRoutes } from './layout/layout.routes';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: LayoutRoutes
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
    }
];
