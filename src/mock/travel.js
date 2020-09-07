import {generateStartMoment, getRandomInteger} from '../utils';
import {generateTravelPoint} from './point';

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


