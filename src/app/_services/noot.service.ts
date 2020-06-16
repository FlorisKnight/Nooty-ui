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

  public async sendNoot(noot: Noot): Promise<Noot> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/noot/create`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: noot.text,
          timestamp: noot.timestamp,
          userId: noot.userId
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }
          if (data.id) {
            const noot2 = new Noot();
            noot2.id = data.id;
            noot2.text = data.text;
            noot2.timestamp = data.timestamp;
            noot2.userId = data.userId;
            resolve(noot2);
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

  public async getNoot(id: string): Promise<Noot> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/noot/${id}`, {
        method: 'GET',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        }
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
            noot.userId = data.userId;
            resolve(noot);
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

  public async getAllNoots(): Promise<Array<Noot>> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/noot/`, {
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
            const list: Noot[] = new Array<Noot>();
            for (const n of data) {
              const noot = new Noot();
              noot.id = n.id;
              noot.text = n.text;
              noot.timestamp = n.timestamp;
              noot.userId = n.userId;
              list.push(noot);
            }
            resolve(list);
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

  public async getNootsTimeline(userIds: Array<string>, lastNootId: string): Promise<Array<Noot>> {
    const storedUser = this.storageService.user.getValue();
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/noot/timeline/${storedUser.id}`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ammount: 20,
          lastId: lastNootId,
          userIds
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data) {
            const list: Noot[] = new Array<Noot>();
            for (const n of data) {
              const noot = new Noot();
              noot.id = n.id;
              noot.text = n.text;
              noot.timestamp = n.timestamp;
              noot.userId = n.userId;
              list.push(noot);
            }
            resolve(list);
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

  public async getNootsFromUser(id: string): Promise<Array<Noot>> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/noot/user/${id}`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ammount: 10,
          lastId: 0,
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data) {
            const list: Noot[] = new Array<Noot>();
            for (const n of data) {
              const noot = new Noot();
              noot.id = n.id;
              noot.text = n.text;
              noot.timestamp = n.timestamp;
              noot.userId = n.userId;
              list.push(noot);
            }
            resolve(list);
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
      fetch(`${environment.api_url}/noot/deleteNoot`, {
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
