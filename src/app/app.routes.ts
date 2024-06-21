import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(component => component.HomeComponent)
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path : '**',
        redirectTo : '/home'
    }
];
