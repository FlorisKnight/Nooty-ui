import { Injectable } from '@angular/core';
import { ajaxGet, ajaxPost } from 'rxjs/internal/observable/dom/AjaxObservable';
import { ajax } from 'rxjs/ajax';

import { environment } from '../../environments/environment';
import { User } from '../_domain/User';
import { StorageService } from './storage.service';

/**
 * The AuthenticationService handles all methods and checks related to logging in and registering.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private storageService: StorageService
  ) { }

  public isAuthenticated(): boolean {
    const user: User = this.storageService.user.getValue();

    if (!user) {
      return false;
    }

    if (!user.token) {
      return false;
    }

    return true;
  }

  public async login(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = new URL(`${environment.api_url}/identity/authorize`);
      url.searchParams.append('userName', username);
      url.searchParams.append('password', password);
      fetch(url.toString(), {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache'
      })
        .then((response) => response.text())
        .then((data) => {
          if (data) {
            this.getUser(data).then((user) => {
              user.token = data;
              user.profileImageUrl = user.profileImageUrl || 'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg';
              this.storageService.user.next(user);
              resolve();
            });
          } else {
            reject();
          }
        });
    });
  }

  public async register(username: string, firstName: string, lastName: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ajaxPost(`${environment.api_url}/user/register`, {username, firstName, lastName, password}, {
        'Content-Type': 'application/json'
      }).subscribe({
        error: error => {
          reject();
        },
        next: data => {
          resolve();
        }
      });
    });
  }

  public async logout(): Promise<void> {
    return this.storageService.user.clear();
  }

  private async getUser(token: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const url = new URL(`${environment.api_url}/identity/getUser`);
      url.searchParams.append('token', token);
      ajax({
        url: url.toString(),
        withCredentials: false,
        crossDomain: true,
        method: 'GET'
      }).subscribe({
        error: (error) => {
          reject();
        },
        next: data => {
          const user = new User({
            id: data.response.id,
            username: data.response.userName,
            displayname: data.response.displayName,
            email: data.response.email
          });

          resolve(user);
        }
      });
    });
  }
}
