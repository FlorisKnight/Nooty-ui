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
import { HeaderComponent } from './_components/header/header.component';
import { NootComponent } from './_components/noot/noot.component';
import { GlobalTimelineComponent } from './_components/global-timeline/global-timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    PersonalPageComponent,
    HeaderComponent,
    NootComponent,
    GlobalTimelineComponent
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
