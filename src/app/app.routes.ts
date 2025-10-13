import { Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/posts/posts.module').then(m => m.PostsModule),
  },
  {path: '', pathMatch: 'full', redirectTo: 'users'},
  {path: '**', redirectTo: 'users' },
];
