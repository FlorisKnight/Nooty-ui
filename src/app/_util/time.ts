import * as moment from 'moment';

export const isLessThan24HoursAgo = (momentOfPosting: moment.Moment): boolean => {
  const now = moment();
  const difference = moment.duration(now.diff(momentOfPosting));
  const differenceAsHours = difference.as('hours');

  return differenceAsHours < 24;
};

export const timestampToMoment = (timestamp: string): moment.Moment => {
  return moment(timestamp, 'x');
};

export const momentToHours = (momentOfPosting: moment.Moment): string => {
  return momentOfPosting.format('HH:mm');
};

export const momentToDate = (momentOfPosting: moment.Moment): string => {
  return momentOfPosting.format('MMM D');
};

export const momentToTimeAndDate = (momentOfPosting: moment.Moment): string => {
  return momentOfPosting.format('dddd, MMMM Do YYYY, HH:mm:ss');
};
