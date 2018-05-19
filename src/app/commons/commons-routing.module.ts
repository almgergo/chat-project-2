import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterMainComponent } from '../filter/filter-main/filter-main.component';

const routes: Routes = [
  { path: 'filter-main', component: FilterMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonsRoutingModule { }
