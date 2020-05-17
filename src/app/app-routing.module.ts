import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './_components/login-page/login-page.component';
import {RegisterPageComponent} from './_components/register-page/register-page.component';
import {HomePageComponent} from './_components/home-page/home-page.component';
import {AuthGuard} from './_services/auth.guard';
import {PersonalPageComponent} from './_components/personal-page/personal-page.component';
import {GlobalTimelineComponent} from './_components/global-timeline/global-timeline.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    // ========= BEGIN PROTECTED COMPONENTS ==========
    { path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
    { path: 'profile', component: PersonalPageComponent, canActivate: [AuthGuard] },
    { path: 'global', component: GlobalTimelineComponent, canActivate: [AuthGuard] },

    // ========== END PROTECTED COMPONENTS ===========
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
