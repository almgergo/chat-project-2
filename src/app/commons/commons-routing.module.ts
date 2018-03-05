import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterMainComponent } from './filter-main/filter-main.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { FilterComponent } from './filter/filter.component';

const routes: Routes = [
  { path: 'filter-main', component: FilterMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonsRoutingModule { }
