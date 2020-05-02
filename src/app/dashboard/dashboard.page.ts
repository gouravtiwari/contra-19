import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Chart } from 'chart.js';
import { getFormattedDatesSinceDaysAgo } from '../utils/date-extension';
import { SymptomsService } from '../services/symptoms.service';

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

  symptomToCanvasMap: any;

  constructor(private platform: Platform,
    private navCtrl: NavController,
    private symptomsService: SymptomsService) {}

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
    console.log(this.symptomsService.getSymptomRecordsSinceDaysAgo(14, symptomType));
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
}
