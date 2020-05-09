import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Chart } from 'chart.js';
import { getFormattedDatesSinceDaysAgo } from '../utils/date-extension';
import { SymptomsService } from '../services/symptoms.service';
import { UsersService } from '../services/users.service';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('feverCanvas', {static: true}) feverCanvas;
  @ViewChild('weaknessCanvas', {static: true}) weaknessCanvas;
  @ViewChild('dryCoughCanvas', {static: true}) dryCoughCanvas;
  @ViewChild('soreThroatCanvas', {static: true}) soreThroatCanvas;
  @ViewChild('runnyNoseCanvas', {static: true}) runnyNoseCanvas;
  @ViewChild('difficultyInBreathingCanvas', {static: true}) difficultyInBreathingCanvas;

  // Values on cards
  @ViewChild('priorityLevel', {static: true}) priorityLevel;
  @ViewChild('exposureScore', {static: true}) exposureScore;
  @ViewChild('symptomsCount', {static: true}) symptomsCount;

  symptomToCanvasMap: any;
  user: any;

  constructor(private platform: Platform,
    private navCtrl: NavController,
    private symptomsService: SymptomsService,
    private authenticationService: AuthenticationService,
    private userService: UsersService) {}

  ngOnInit() {
    this.symptomToCanvasMap = {
      'fever': this.feverCanvas,
      'weakness': this.weaknessCanvas,
      'dry_cough': this.dryCoughCanvas,
      'sore_throat': this.soreThroatCanvas,
      'runny_nose': this.runnyNoseCanvas,
      'difficulty_in_breathing': this.difficultyInBreathingCanvas
    };

    this.lineChartMethod('fever');
    this.barChartMethod('weakness');
    this.barChartMethod('dry_cough');
    this.barChartMethod('sore_throat');
    this.barChartMethod('runny_nose');
    this.barChartMethod('difficulty_in_breathing');
    // This needs testing, as API is returning 404
    this.userService.usersShow(this.authenticationService.currentUserValue.idToken).subscribe((res) => {
      this.user = res;
      this.setPriorityLevel(this.priorityLevel);
      this.setExposureScore(this.exposureScore);
    });


    this.setSymptomsCount(this.symptomsCount);
  }

  symptoms() {
    this.navCtrl.navigateRoot('/symptoms');
  }

  userProfile() {
    this.navCtrl.navigateRoot('/user-info');
  }

  qrCode() {
    this.navCtrl.navigateRoot('/qr-code');
  }

  barChartMethod(symptomType) {
    new Chart(this.symptomToCanvasMap[symptomType].nativeElement, {
      type: 'bar',
      data: {
        labels: getFormattedDatesSinceDaysAgo(14),
        datasets: [
          {
            fill: true,
            borderColor: 'rgba(255, 172, 75, 1)',
            backgroundColor: 'rgba(255, 172, 75, 1)',
            pointBackgroundColor: '#fff',
            hoverBackgroundColor: 'rgba(75,192,192,1)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: this.symptomsService.getSymptomRecordsSinceDaysAgo(14, symptomType),
            spanGaps: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              maxTicksLimit: 1,
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }
    });
  }

  lineChartMethod(symptomType) {
    const labels = getFormattedDatesSinceDaysAgo(14);

    new Chart(this.symptomToCanvasMap[symptomType].nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Fever in Fahrenheit',
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            data: this.symptomsService.getSymptomRecordsSinceDaysAgo(14, symptomType),
            spanGaps: false
          }
        ]
      },
      options: {
        spanGaps: true,
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              min: 95,
              maxTicksLimit: 5,
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }
    });
  }

  setPriorityLevel(element) {
    element.nativeElement.innerText = this.user.priority;
  }

  setExposureScore(element) {
    element.nativeElement.innerText = this.user.corona_score || 0;
  }

  setSymptomsCount(element) {
    const today = new Date();
    let currentSymptoms = this.symptomsService.getSymptomRecord(new Date(today.toDateString()).toISOString());

    if (!currentSymptoms) {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      currentSymptoms = this.symptomsService.getSymptomRecord(new Date(yesterday.toDateString()).toISOString());
    }

    let count = 0;

    if (currentSymptoms) {
      count = Object.keys(currentSymptoms).filter((key) => {
        if (currentSymptoms[key]) {
          if (typeof(currentSymptoms[key]) === 'boolean' && currentSymptoms[key]) {
            // if it's boolean and it's true, then consider it as symptom
            return key;
          } else if (typeof(currentSymptoms[key]) === 'string') {
            const num = parseInt(currentSymptoms[key]);
            // if this is fever, then consider it as symptom
            if (typeof(num) === 'number' && num > 98.6) {
              return key;
            }
          }
        }
      }).length;
    }

    element.nativeElement.innerText = count;
  }
}
