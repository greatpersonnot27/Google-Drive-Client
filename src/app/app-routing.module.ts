import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriveContentsComponent } from './components/drive-contents/drive-contents.component';
import { AuthGuardGuard } from './components/auth-guard.guard';


const routes: Routes = [
  {path: 'drive', component: DriveContentsComponent, canActivate: [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
