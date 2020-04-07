import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from  "@angular/router";


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  user: object = {};

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.signInAnonymously().then((data) => {
      if (data.user && data.user.uid) {
        this.user = { uid: data.user.uid };
      }
      console.log(this.user);
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`login failed ${error.message}`)
    });
  }

  private signInAnonymously() {
    return new Promise<any>((resolve, reject) => {
      this.fireauth.auth.signInAnonymously().then((data) => {
        resolve(data);
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`login failed ${error.message}`)
      });
    });
  }

}
