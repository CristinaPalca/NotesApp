import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import {ProgressPageComponent} from './progress-page/progress-page.component';


const routes: Routes = [
  {path: 'progress', component: ProgressPageComponent},
  {path: '', component: CategoriesComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
