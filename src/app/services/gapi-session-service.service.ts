import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const CLIENT_ID = "709682704083-i2phfpe3tm0rctq2l9g8vrvtutejm9kf.apps.googleusercontent.com";
const API_KEY = "AIzaSyBQTjU-9nox8zgRwBiPGi3gF1vc2Er4cmg";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';

@Injectable({
  providedIn: 'root'
})
export class GapiSessionServiceService {
  gAuth: gapi.auth2.GoogleAuth;
  userProfile: gapi.auth2.BasicProfile;
  signedState: Observable<boolean>;

  constructor() {
    this.signedState = of(false);
   }

  initClient() {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        return gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        }).then(() => {
          this.gAuth = gapi.auth2.getAuthInstance();
          resolve();
        });
      });
    });

  }
  get isSignedIn(): boolean {
    return this.gAuth.isSignedIn.get();
  }

  signIn() {
    console.log(this.signedState);
    return this.gAuth.signIn({
      prompt: 'consent'
    }).then((googleUser: gapi.auth2.GoogleUser) => {
      this.userProfile = googleUser.getBasicProfile();
      this.signedState = of(this.isSignedIn);
    });
  }

  signOut(): void {
    this.gAuth.signOut();
  }
}

