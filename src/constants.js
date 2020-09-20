import {getRandomInteger} from './utils/common';

export const EVENT_DAY = getRandomInteger(2, 10);
export const sortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const sortDirection = {
  UP: `up`,
  DOWN: `down`,
  DEFAULT: `default`
};
