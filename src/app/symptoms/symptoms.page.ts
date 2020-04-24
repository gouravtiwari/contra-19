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
  minYear: number;
  maxYear: number;

  constructor(private router: Router,
    private platform: Platform,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    this.today = new Date().toISOString();
    this.maxYear = new Date().getFullYear();
    this.minYear = this.maxYear - 1;

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
