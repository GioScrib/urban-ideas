import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from '../../pages/post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../pages/post-list/post-list.component')
      .then(m => m.PostListComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
