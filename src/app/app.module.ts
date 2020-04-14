import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './_components/login-page/login-page.component';
import { RegisterPageComponent } from './_components/register-page/register-page.component';
import { HomePageComponent } from './_components/home-page/home-page.component';
import { PersonalPageComponent } from './_components/personal-page/personal-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GravatarModule} from 'ngx-gravatar';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    PersonalPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GravatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
