import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { NavController } from '@ionic/angular';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  constructor(private navCtrl: NavController,private userService: UsersService) {}
  // constructor(private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {

  }

  register(form) {
    console.log("register");
    console.log(form.value);
    // This needs testing, as API is returning 404
    this.userService.usersUpdate(form.value).subscribe((res) => {

      // this.router.navigateByUrl('home');
    });
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
