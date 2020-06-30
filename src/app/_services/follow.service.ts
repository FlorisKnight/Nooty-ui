import { Injectable } from '@angular/core';
import {User} from '../_domain/User';
import {environment} from '../../environments/environment';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(
    private storageService: StorageService
  ) { }

  public getFollowing(id: string): Promise<Array<string>> {
    return new Promise((resolve) => {
      fetch(`${environment.api_url}/follow/${id}`, {
        method: 'GET',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.storageService.following.next(data);
          resolve(data);
        });
    });
  }

  public getFollowers(id: string): Promise<Array<string>> {
    return new Promise((resolve) => {
      fetch(`${environment.api_url}/follow/followers/${id}`, {
        method: 'GET',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.storageService.following.next(data);
          resolve(data);
        });
    });
  }

  public follow(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const storedUser = this.storageService.user.getValue();

      fetch(`${environment.api_url}/follow/follow/${storedUser.id}`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: id
        })
      })
        .then((response) => {
          if (response.status === 200) {
            resolve();
          } else {
            reject();
          }
        });
    });
  }

  public unfollow(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const storedUser = this.storageService.user.getValue();

      fetch(`${environment.api_url}/follow/unfollow/${storedUser.id}`, {
        method: 'DELETE',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: id
        })
      })
        .then((response) => {
          if (response.status === 200) {
            resolve();
          } else {
            reject();
          }
        });
    });
  }
}
