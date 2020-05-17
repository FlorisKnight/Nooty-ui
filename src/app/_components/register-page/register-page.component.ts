import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {AuthenticationService} from '../../_services/authentication.service';
import {FollowService} from '../../_services/follow.service';
import {StorageService} from '../../_services/storage.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  message = {
    email: '',
    displayname: '',
    username: '',
    password: '',
    generic: ''
  };

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private followService: FollowService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      displayname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.message.email = null;
    this.message.username = null;
    this.message.displayname = null;
    this.message.password = null;
    this.message.generic = null;
    this.submitted = true;
    this.loading = true;

    this.authenticationService.register(
      this.f.username.value, this.f.displayname.value, this.f.email.value, this.f.password.value
    )
      .then(() => {
        this.getFollowing();
        this.router.navigate(['/login'], { queryParams: { action: 'postcreation' } });
      })
      .catch((error) => {
        // Failed login
        this.message.generic = error?.message || 'Invalid email or password';

        setTimeout(() => {
          this.message.generic = null;
        }, 10000);
      })
      .finally(() => {
        this.submitted = false;
        this.loading = false;
      });
  }

  private getFollowing(): void {
    const user = this.storageService.user.getValue();
    this.followService.getFollowing(user.id);
  }
}
