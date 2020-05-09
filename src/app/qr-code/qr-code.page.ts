import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from  "@angular/router";
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './../services/authentication.service';
import { UserConnectionsService } from './../services/user-connections.service';

import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  encodeData: any;
  scannedData: {};
  elementType: 'url' | 'canvas' | 'img' = 'img';
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private fireauth: AngularFireAuth,
    private router: Router,
    private platform: Platform,
    public loadingController: LoadingController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private barcodeScanner: BarcodeScanner,
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private userConnectionsService: UserConnectionsService
  ) {
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  ngOnInit() {
    this.reInitializeIdToken();
    this.encodeData = this.authService.currentUserValue.idToken;
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  encodedText() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then((encodedData) => {
      console.log(encodedData);
      this.encodeData = encodedData;
    }, (err) => {
      console.log("Error occured : " + err);
    });
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      alert('Barcode data ' + JSON.stringify(barcodeData));
      this.scannedData = barcodeData;

      this.userConnectionsService.userConnectionsCreate(
        this.authService.currentUserValue.idToken,
        this.scannedData,
        'qr'
      )
        .subscribe(
          data => { return data['_body']; },
          error => { console.log(error); }
        );
    }).catch(err => {
      console.log('Error', err);
    });
  }

  userProfile() {
    this.navCtrl.navigateRoot('/user-info');
  }

  // this function is only for temporarily,
  // it is there to get uid until we have navigation sorted,
  // once complete navigation is done, we will get uid by:
  // this.fireauth.auth.getUid()
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


  reInitializeIdToken() {
    if (!this.authService.currentUserValue['idToken']) {
      this.navCtrl.navigateRoot('');
    }

    // Re-initialize when user is loggedIn
    if (this.authService.currentUserValue) {
      // Fetching token every hour now
      if (parseInt(this.authService.currentUserValue['savedOn']) + 3600 < Date.now() ) {
        this.openLoader();
        this.signInAnonymously().then(
          (userData) => {
            // Store locally
            const user = { 'idToken': userData.user.xa, 'savedOn': Date.now() };
            this.authService.setCurrentUser(user);

            console.log("New id token: " + JSON.stringify(user));
          }
        ).catch(err => {
          if (err) {
            console.log(err);
            //this.presentToast(`${err}`, true, 'bottom', 2100);
          }

        }).then(el => this.closeLoading());
      }
    } else {
      this.navCtrl.navigateRoot('/user-info');
    }
  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  symptoms() {
    this.navCtrl.navigateRoot('/symptoms');
  }

  dashboard() {
    this.navCtrl.navigateRoot('/dashboard');
  }

}
