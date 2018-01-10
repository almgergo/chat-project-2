import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonsRoutingModule } from './commons/commons-routing.module';

const routes: Routes = [
  { path: '',
    redirectTo: '/filter-main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonsRoutingModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
