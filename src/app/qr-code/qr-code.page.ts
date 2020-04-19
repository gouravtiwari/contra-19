import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from  "@angular/router";
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private barcodeScanner: BarcodeScanner,
    private navCtrl: NavController
  ) {
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  ngOnInit() {

    // this function call is only for temporarily,
    // it is there to get uid until we have navigation sorted,
    // once complete navigation is done, we will get uid by:
    // this.fireauth.auth.getUid()
    this.signInAnonymously().then((data) => {
      if (data.user && data.user.xa) {
        this.encodeData = data.user.xa;
        this.barcodeScannerOptions = {
          showTorchButton: true,
          showFlipCameraButton: true
        };
      }
      console.log(this.encodeData);
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`login failed ${error.message}`)
    });
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

  symptoms() {
    this.navCtrl.navigateRoot('/symptoms');
  }

}
