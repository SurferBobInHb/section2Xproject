import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'ana/login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin = false;
  loginForm: FormGroup;
  returnUrl: string;
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  get f() { return this.loginForm.controls; }

  login() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      console.log(this.loginForm);
      this.loginForm.setErrors({
        invalidLogin: true
      });
      return;
    }

    let userNamePassword = {username: this.f.username.value, password: this.f.password.value};

    this.authService.login(userNamePassword).pipe(first())
      .subscribe(result => {
        if (result) {
          this.invalidLogin = false;
          this.loginForm.setErrors({invalidLogin: false});
          this.router.navigate([this.returnUrl]);
        }
        else {
          this.invalidLogin = true;
          this.loginForm.setErrors({invalidLogin: true});
        }
      });

  }

}
