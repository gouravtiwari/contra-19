import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, Platform, AlertController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from './../services/users.service';
import { AuthenticationService } from './../services/authentication.service';

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
    private usersService: UsersService,
    private authService: AuthenticationService,
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
        console.log("SignInAnonymously with id token: " + JSON.stringify(userData));
        // Create a new user in backend with idToken
        this.usersService.signUp(userData.user.xa).subscribe(
          data => { return data['_body']; },
          error => { console.log(error); }
        );

        // Store locally
        const user = { 'idToken': userData.user.xa, 'savedOn': Date.now() };
        this.authService.setCurrentUser(user);

        console.log("User created with id token: " + JSON.stringify(user));
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
    this.usersService.signUp(idToken)
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
