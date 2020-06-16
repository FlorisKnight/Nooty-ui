import * as moment from 'moment';
import { User } from './User';
import { timestampToMoment, isLessThan24HoursAgo, momentToDate, momentToHours, momentToTimeAndDate } from '../_util/time';

export class Noot {
  constructor(){
  }

  public id: string;
  public text: string;
  public timestamp: string;
  public userId: string;
  public user: User;

  public newNoot(text: string, timestamp: string, user: string) {
    this.text = text;
    this.timestamp = timestamp;
    this.userId = user;
  }

  public newNootNoot(noot: Noot) {
    this.id = noot.id;
    this.text = noot.text;
    this.timestamp = noot.timestamp;
    this.userId = noot.userId;
  }

  public newNootId(id: string, text: string, timestamp: string, user: string) {
    this.id = id;
    this.text = text;
    this.timestamp = timestamp;
    this.userId = user;
  }

  public formatTimestamp(): string {
    if (!this.timestamp) {
      throw new Error(`No timestamp was defined on this Twat`);
    }

    const timeOfPosting = timestampToMoment(this.timestamp);
    if (isLessThan24HoursAgo(timeOfPosting)) {
      return momentToHours(timeOfPosting);
    } else {
      return momentToDate(timeOfPosting);
    }
  }

  public formatTitle(): string {
    const timeOfPosting = timestampToMoment(this.timestamp);
    return momentToTimeAndDate(timeOfPosting);
  }
}
