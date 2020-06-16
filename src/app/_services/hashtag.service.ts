import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import {Noot} from '../_domain/Noot';
import {environment} from '../../environments/environment';
import {GenericError} from '../_domain/GenericError';
import {Hashtag} from '../_domain/Hashtag';

@Injectable({
  providedIn: 'root'
})
export class HashtagService {

  constructor(private storageService: StorageService) { }

  public async getAllHashtags(): Promise<Array<Hashtag>> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/hashtag/`, {
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
            const list: Hashtag[] = new Array<Hashtag>();
            for (const hashtag of data) {
              list.push(new Hashtag(hashtag.id, hashtag.hashtag));
            }
            resolve(list);
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not retrieve hashtags due to a server error, please contact support if the issue persists.'
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

  public async getNootIdFromHashtagId(hashtagId: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/hashtag/id/${hashtagId}`, {
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
            const list: string[] = new Array<string>();
            for (const hashtag of data) {
              list.push(hashtag);
            }
            resolve(list);
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not retrieve hashtags due to a server error, please contact support if the issue persists.'
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

  public async getNootIdFromHashtag(hashtagName: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/hashtag/${hashtagName}`, {
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
            const list: string[] = new Array<string>();
            for (const hashtag of data) {
              list.push(hashtag);
            }
            resolve(list);
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not retrieve hashtags due to a server error, please contact support if the issue persists.'
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
