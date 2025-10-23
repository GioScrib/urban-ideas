import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from '../../pages/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  {path: ':id', loadComponent: () =>
      import('../../pages/user-details-page/user-details-page.component')
      .then(m => m.UserDetailsPageComponent)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
