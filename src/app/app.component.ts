import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GapiSessionServiceService } from './services/gapi-session-service.service';
import { Router } from '@angular/router';
import { UserInfo } from './models/userInfo';
import { FileManipulationService } from './services/file-manipulation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signinForm: FormGroup;
  userProfile: gapi.auth2.BasicProfile;
  loggedIn: boolean;
  firstName: string;
  surname: string;
  email: string;
  constructor(private fb: FormBuilder, private gapService: GapiSessionServiceService,private ngZone: NgZone, private router: Router, private cd: ChangeDetectorRef, private fileservice: FileManipulationService) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.gapService.signedState.subscribe((state) => {
      this.loggedIn = state;
    })
  }

  sinInWithGoogle(): void {
    this.gapService.signIn().then(() => {
      if (this.gapService.isSignedIn) {
        this.loggedIn = true;
        this.setUserInfo();
        this.cd.detectChanges();
      }
    });
  }

  signOut(): void {
    this.gapService.signOut();
    this.clearUserInfo();
    this.loggedIn = false;
    this.cd.detectChanges();
  }

  setUserInfo(): void {
    this.firstName = this.gapService.UserInfo.FirstName;
    this.surname = this.gapService.UserInfo.Surname;
    this.email = this.gapService.UserInfo.Email;
  }

  clearUserInfo(): void {
    this.firstName = "";
    this.surname = "";
    this.email = "";
  }

  openDrive(): void {
    this.fileservice.getFiles("root");
    this.ngZone.run(() => this.router.navigate(['/drive']).then((res) => {
      this.cd.detectChanges();}
    ))
  }
}
