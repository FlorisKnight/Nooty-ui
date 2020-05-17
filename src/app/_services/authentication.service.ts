import { Injectable } from '@angular/core';
import { ajaxGet, ajaxPost } from 'rxjs/internal/observable/dom/AjaxObservable';
import { ajax } from 'rxjs/ajax';

import { environment } from '../../environments/environment';
import { User } from '../_domain/User';
import { StorageService } from './storage.service';
import {GenericError} from '../_domain/GenericError';

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

    return true;
  }

  public async login(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/account/login`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data.id) {
            const user = new User({
              id: data.id,
              email: data.email,
              username: data.username,
              displayname: data.displayname,
            });

            this.storageService.user.next(user);
            resolve();
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not login due to a server error, please contact support if the issue persists.'
            }));
          }
        })
        .catch((error) => {
          // Check for internet connection
          if (!navigator.onLine) {
            reject(new GenericError({
              name: 'NoNetworkError',
              message: 'There is no network connection right now. Check your internet connection and try again.'
            }));
            return;
          }

          console.log(error);
          reject(error);
        });
    });
  }

  public async register(username: string, displayname: string, email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/account/register`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          displayname,
          email,
          password,
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data.id) {
            const user = new User({
              id: data.id,
              email: data.email,
              username: data.username,
              displayname: data.displayname,
            });

            this.storageService.user.next(user);
            resolve();
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not register due to a server error, please contact support if the issue persists.'
            }));
          }
        })
        .catch((error) => {
          // Check for internet connection
          if (!navigator.onLine) {
            reject(new GenericError({
              name: 'NoNetworkError',
              message: 'There is no network connection right now. Check your internet connection and try again.'
            }));
            return;
          }

          console.log(error);
          reject(error);
        });
    });
  }

  public async logout(): Promise<void> {
    this.storageService.following.clear();
    return this.storageService.user.clear();
  }
}
