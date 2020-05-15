import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DriveContentsComponent } from './components/drive-contents/drive-contents.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GapiSessionServiceService } from './services/gapi-session-service.service';

export function initGapi(gapiSession: GapiSessionServiceService) {
  return () => gapiSession.initClient();
}
@NgModule({
  declarations: [
    AppComponent,
    DriveContentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ { provide: APP_INITIALIZER, useFactory: initGapi, deps: [GapiSessionServiceService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
