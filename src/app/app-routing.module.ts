import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import {ProgressPageComponent} from './progress-page/progress-page.component';


const routes: Routes = [
  {path: 'categories', component: CategoriesComponent},
  {path: '', redirectTo: 'categories', pathMatch: 'full'},
  {path: 'progress', component: ProgressPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
