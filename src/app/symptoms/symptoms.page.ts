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
    ) { }

  ngOnInit() {
    const today = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(today.getDate() - 14);

    this.today = new Date(today.toDateString()).toISOString();
    this.maxDate = this.today;
    this.minDate = new Date(twoWeeksAgo.toDateString()).toISOString();

    const currentSymptoms = this.symptomsService.getSymptomRecord(this.today);
    // initialize form with selected date
    this.initializeSymptomsForm(currentSymptoms);
  }

  symptoms() {
    const res = this.symptomsService.update(this.symptomsFormGroup.value);
  }

  reloadSymptoms(event) {
    const selectedDate = new Date(event.target.value);
    const symptomsByDate = this.symptomsService.getSymptomRecord(selectedDate);

    if (symptomsByDate) {
      // update form with symptoms for the selected date
      this.updateSymptomsForm(symptomsByDate);
    } else {
      // reset form when there are no symptoms for the selected date
      this.resetSymptomsForm();
    }
  }

  initializeSymptomsForm(currentSymptoms) {
    this.symptomsFormGroup = this.formBuilder.group({
      observed_date: [this.today],
      fever: [ (currentSymptoms && currentSymptoms.fever) || '' ],
      weakness: [ currentSymptoms ? currentSymptoms.weakness : false ],
      dry_cough: [ currentSymptoms ? currentSymptoms.dry_cough : false ],
      sore_throat: [ currentSymptoms ? currentSymptoms.sore_throat : false ],
      runny_nose: [ currentSymptoms ? currentSymptoms.runny_nose : false ],
      difficulty_in_breathing: [ currentSymptoms ? currentSymptoms.difficulty_in_breathing : false ]
    });
  }

  resetSymptomsForm() {
    this.symptomsFormGroup.get('fever').setValue('');
    this.symptomsFormGroup.get('weakness').setValue(false);
    this.symptomsFormGroup.get('dry_cough').setValue(false);
    this.symptomsFormGroup.get('sore_throat').setValue(false);
    this.symptomsFormGroup.get('runny_nose').setValue(false);
    this.symptomsFormGroup.get('difficulty_in_breathing').setValue(false);
  }

  updateSymptomsForm(symptomsByDate) {
    this.symptomsFormGroup.get('fever').setValue(symptomsByDate.fever);
    this.symptomsFormGroup.get('weakness').setValue(symptomsByDate.weakness);
    this.symptomsFormGroup.get('dry_cough').setValue(symptomsByDate.dry_cough);
    this.symptomsFormGroup.get('sore_throat').setValue(symptomsByDate.sore_throat);
    this.symptomsFormGroup.get('runny_nose').setValue(symptomsByDate.runny_nose);
    this.symptomsFormGroup.get('difficulty_in_breathing').setValue(symptomsByDate.difficulty_in_breathing);
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
