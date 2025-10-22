import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from '../../pages/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  {path: ':id', loadComponent: () =>
      import('../../pages/user-details/user-details.component')
      .then(m => m.UserDetailsComponent)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
