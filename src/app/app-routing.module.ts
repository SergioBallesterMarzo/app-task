import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewComponent } from './pages/new-page/new.component';
import { EditComponent } from './pages/edit-page/edit.component';

const routes: Routes = [

      {  path:'home', component:LayoutPageComponent},
      {  path:'new', component:NewComponent},
      {  path:'edit', component:EditComponent},
      {  path:':id', component:EditComponent},
      {  path:'**', redirectTo: 'home'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
