import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.page.html',
  styleUrls: ['./symptoms.page.scss'],
})
export class SymptomsPage implements OnInit {
  today: string;
  minDate: string;
  maxDate: string;

  constructor(private router: Router,
    private platform: Platform,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    let today = new Date();
    let twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(today.getDate() - 14);

    this.today = today.toISOString();
    this.maxDate = this.today;
    this.minDate = twoWeeksAgo.toISOString();

  }

  userProfile() {
    this.navCtrl.navigateRoot('/user-info');
  }

  qrCode() {
    this.navCtrl.navigateRoot('/qr-code');
  }

  dashboard() {
    this.navCtrl.navigateRoot('/dashboard');
  }
}
