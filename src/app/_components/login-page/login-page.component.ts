import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {AuthenticationService} from '../../_services/authentication.service';
import {Router, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  redirectTo: string;
  message = {
    email: '',
    password: '',
    generic: ''
  };

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;

    // Allow an action to be passed in the url (i.e. example.com/login?action=logout)
    switch (snapshot.root.queryParams.action) {
      case 'logout': {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
        break;
      }
      case 'postcreation': {
        // Let the user know the account has been created and they should login
        this.message.generic = 'Your account has been created succesfully, you may now login.';
        break;
      }
    }

    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
// Convenience getter for easy access to form fields
get f(): { [key: string]: AbstractControl } {
  return this.loginForm.controls;
}

onSubmit(): void {
  this.message.email = null;
  this.message.password = null;
  this.message.generic = null;
  this.submitted = true;
  this.loading = true;

  this.authenticationService.login(this.f.email.value, this.f.password.value)
  .then(() => {
    // On succesfull login
    if (this.redirectTo) {
      this.router.navigate([this.redirectTo]);
    } else {
      this.router.navigate(['/']);
    }
  })
  .catch((error) => {
    // Failed login
    this.message.generic = error?.message || 'Invalid email or password';

    setTimeout(() => {
      this.message.generic = null;
    }, 15 * 1000);
  })
  .finally(() => {
    this.submitted = false;
    this.loading = false;
  });
}

}
