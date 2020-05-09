import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from './../services/authentication.service';
import { UsersService } from './../services/users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  private userInfoFormGroup : FormGroup;

  constructor(private navCtrl: NavController,
    public loadingController: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthenticationService,
    private userService: UsersService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    this.openLoader();
    this.userService.usersShow(currentUser.idToken).subscribe((res) => {
      // initialize form with current user info
      console.log(res);
      this.initializeUserInfoForm(res);
      this.closeLoading()
    });

  }

  async register(form) {
    const userInfoFormValues = this.userInfoFormGroup.value;
    console.log("register");
    console.log(userInfoFormValues);

    this.userService.usersUpdate(userInfoFormValues).subscribe((res) => {
      console.log(res);
    });

    const toast = await this.toastCtrl.create({
      message: 'Your information is updated successfully.',
      duration: 2000,
      color: 'primary'
    });

    toast.present();

  }

  initializeUserInfoForm(user) {
    this.userInfoFormGroup = this.formBuilder.group({
      age: [user && user.age || ''],
      gender: [ user && user.gender || '' ],
      status: [ user && user.status || '' ],
      country: [ user && user.country || '' ],
      zipCode: [ user && user.zip_code || '' ]
    });
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

  qrCode() {
    this.navCtrl.navigateRoot('/qr-code');
  }

  symptoms() {
    this.navCtrl.navigateRoot('/symptoms');
  }

  dashboard() {
    this.navCtrl.navigateRoot('/dashboard');
  }
}
