import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'repos',
        pathMatch: 'full'
    },
    {
        path: 'repos',
        loadComponent: () => import('./pages/repos/repos.component')
            .then(m => m.ReposComponent)
    },

    {
        path: 'commits/:repoId',
        loadComponent: () => import('./pages/commits/commits.component')
            .then(m => m.CommitsComponent)
    },

    {
        path: 'fire',
        loadComponent: () => import('./pages/firebase/firebase.component')
            .then(m => m.FireBaseComponent)
    },

    { path: '**', component: NotFoundComponent }
];
