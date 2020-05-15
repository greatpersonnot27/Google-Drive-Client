import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GapiSessionServiceService } from './services/gapi-session-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signinForm: FormGroup;
  userProfile: gapi.auth2.BasicProfile;
  loggedIn: boolean;

  constructor(private fb: FormBuilder, private gapService: GapiSessionServiceService, private router: Router, private cd: ChangeDetectorRef) { }

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
        this.cd.detectChanges();
      }
    });
  }

  signOut(): void {
    this.gapService.signOut()
  }

}
