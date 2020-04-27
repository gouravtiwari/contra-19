import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import {  Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from  "@angular/router";
import { SymptomsService } from '../services/symptoms.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.page.html',
  styleUrls: ['./symptoms.page.scss'],
})
export class SymptomsPage implements OnInit {
  private symptomsFormGroup : FormGroup;

  today: string;
  minDate: string;
  maxDate: string;

  constructor(private router: Router,
    private platform: Platform,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private symptomsService: SymptomsService
    ) {
      this.symptomsFormGroup = this.formBuilder.group({
        observed_date: [''],
        fever: ['', Validators.required],
        weakness: [false],
        dry_cough: [false],
        sore_throat: [false],
        runny_nose: [false],
        difficulty_in_breathing: [false]
      });
    }

  ngOnInit() {
    const today = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(today.getDate() - 14);

    this.today = new Date(today.toDateString()).toISOString();
    this.maxDate = this.today;
    this.minDate = new Date(twoWeeksAgo.toDateString()).toISOString();

  }

  symptoms() {
    console.log("Symptoms");
    console.log();

    const res = this.symptomsService.update(this.symptomsFormGroup.value);
    console.log(res);
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
