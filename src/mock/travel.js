import {generateStartTime, getRandomInteger} from '../utils';
import {generateTravelPoint} from './point';

const oneTravelPoint = ()=> {
  return Array(getRandomInteger(getRandomInteger(2,5)))
  .fill()
  .map(generateTravelPoint);
  }

export const travelPoint = () => {
  return {
    day: generateStartTime(),
    info: oneTravelPoint(),
  }
}


