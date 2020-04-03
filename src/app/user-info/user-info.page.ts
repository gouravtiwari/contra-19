import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
//import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

 constructor() { }
 // constructor(private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
  }

    register(form) {
  //  this.authService.register(form.value).subscribe((res) => {
  //    this.router.navigateByUrl('home');
   // });
  }

}
