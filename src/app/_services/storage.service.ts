import { Injectable } from '@angular/core';

import {StoredBehaviorSubject} from '../_domain/StoredBehaviorSubject';
import {User} from '../_domain/User';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public user: StoredBehaviorSubject<User> = new StoredBehaviorSubject<User>('user');
}
