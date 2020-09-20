import {generateStartMoment} from '../utils/moment';
import {generateTravelPoint} from './point';
import {getRandomInteger} from '../utils/common';

const oneTravelPoint = () => {
  return Array(getRandomInteger(getRandomInteger(2, 5)))
    .fill(undefined)
    .map(generateTravelPoint);
};

export const travelPoint = () => {
  return {
    day: generateStartMoment(),
    info: oneTravelPoint(),
  };
};


