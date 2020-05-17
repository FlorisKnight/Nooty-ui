import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import {User} from '../_domain/User';
import {environment} from '../../environments/environment';
import {GenericError} from '../_domain/GenericError';
import {Noot} from '../_domain/Noot';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private storageService: StorageService) {
    return;
  }

  public getByID(id: string): Promise<User> {
    return new Promise((resolve) => {
      fetch(`${environment.api_url}/account/${id}`, {
        method: 'GET',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
      .then((user) => {
        resolve(user);
      });
    });
  }

  public update(partialUser: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const storedUser = this.storageService.user.getValue();

      fetch(`${environment.api_url}/account/update`, {
        method: 'PATCH',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          partialUser
        })
      })
        .then((response) => {
        if (response.status === 204) {
          const newUser = new User(Object.assign(storedUser.toObject(), partialUser.toObject()));
          this.storageService.user.next(newUser);
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  public delete(): Promise<string> {
    return new Promise((resolve, reject) => {
      const storedUser = this.storageService.user.getValue();

      fetch(`${environment.api_url}/account/${storedUser.id}`, {
        method: 'GET',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          if (response.status === 204) {
            resolve();
          } else {
            reject();
          }
        });
    });
  }
}
