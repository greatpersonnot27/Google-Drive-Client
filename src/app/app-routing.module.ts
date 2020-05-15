import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriveContentsComponent } from './components/drive-contents/drive-contents.component';


const routes: Routes = [
  {path: 'drive', component: DriveContentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
