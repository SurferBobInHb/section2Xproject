import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'ana/login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin = false;

  constructor(private authService: AuthService, private router: Router) { 
  }

  ngOnInit(): void {
  }

  login(userNamePassword: string []) {
    console.log(userNamePassword);

    this.authService.login(userNamePassword)
      .subscribe(result => { 
      if (result)
        this.router.navigate(['/']);
      else  
        this.invalidLogin = true; 
    });

  }

}
