import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import {environment} from '../../environments/environment';
import {GenericError} from '../_domain/GenericError';
import {User} from '../_domain/User';
import {Noot} from '../_domain/Noot';

@Injectable({
  providedIn: 'root'
})
export class NootService {

  constructor(
    private storageService: StorageService
  ) { }

  public async sendNoot(noot: Noot): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/noots/sendNoot`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          noot
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data.id) {
            noot.id = data.id;
            resolve();
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not send noot due to a server error, please contact support if the issue persists.'
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

  public async getNoot(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/noots/getNoot`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data.id) {
            const noot = new Noot();
            noot.id = data.id;
            noot.text = data.text;
            noot.timestamp = data.timestamp;
            noot.user = new User({
                id: data.user.id,
                email: data.user.email,
                username: data.user.username,
                displayname: data.user.displayname,
            });
            resolve();
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not retrieve noot due to a server error, please contact support if the issue persists.'
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

  public async getAllNoots(): Promise<Noot[]> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/noots/getAllNoots`, {
        method: 'GET',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data) {
            // TODO read array
            return data;
            resolve();
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not retrieve noots due to a server error, please contact support if the issue persists.'
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

  public async getNootsTimeline(userId: string, lastNootId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/noots/getNootsTimeline`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          lastNootId
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data) {
            // TODO read array
            resolve();
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not retrieve noots due to a server error, please contact support if the issue persists.'
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

  public async getNootsFromUser(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/noots/getNootsFromUser`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data) {
            // TODO read array
            resolve();
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not retrieve noots due to a server error, please contact support if the issue persists.'
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

  public async deleteNoot(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/noots/deleteNoot`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data.id) {
            // TODO say if its deleted
            resolve();
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not send noot due to a server error, please contact support if the issue persists.'
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
}
