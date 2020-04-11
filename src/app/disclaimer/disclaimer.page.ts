import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, Platform, AlertController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserRegistrationService } from './../services/user-registration.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {
  error: string = '';
  idToken: string = '';
  wantsToLoginWithCredentials: boolean = false;

  constructor(private fireauth: AngularFireAuth,
    private router: Router,
    private platform: Platform,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private userRegistrationService: UserRegistrationService,
    private navCtrl: NavController) {
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
  login() {
    this.openLoader();
    this.signInAnonymously().then(
      (userData) => {
        console.log(userData);
        // this.registerUserToBackend(userData.user.xa);
        this.userRegistrationService.signUp(userData.user.xa).subscribe(
          data => { return data['_body']; },
          error => { console.log(error); }
        );
        this.navCtrl.navigateRoot('/user-info');
      }
    ).catch(err => {
      if (err) {
        console.log(err);
        //this.presentToast(`${err}`, true, 'bottom', 2100);
      }

    }).then(el => this.closeLoading());
  }
  private signInAnonymously() {
    return new Promise<any>((resolve, reject) => {
      this.fireauth.auth.signInAnonymously().then((data) => {
        resolve(data);
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        reject(`login failed ${error.message}`)
      });
    });
  }
  private registerUserToBackend(idToken) {
    this.userRegistrationService.signUp(idToken)
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

}
