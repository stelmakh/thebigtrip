import {travelPoint} from './mock/travel';
import {getRandomInteger} from './utils/common';
import {EVENT_DAY} from './constants';

// generate all mock day
export const travelPointAll = new Array(EVENT_DAY)
  .fill(undefined)
  .map(travelPoint)
  .sort((a, b) => {
    return a.day - b.day;
  });

// only info array
export const allPointInfo = travelPointAll.map((item) => {
  return item.info;
});

export const allPointPrice = allPointInfo
  .map((item) => {
    return item.reduce((sum, current) => sum + current.price, 0);
  })
  .reduce((sum, current) => sum + current, 0);

/**
 * @description find travel points
 * @return {{finalPoint: string, firstPoint: string, middlePoint: string}}
 */
const getTravelPoints = () => {
  const firstTravelDay = allPointInfo[0];
  const middleTravelDay = allPointInfo[Math.round(allPointInfo.length / 2)];
  const lastTravelDay = allPointInfo[allPointInfo.length - 1];
  const firstPoint = firstTravelDay[0].city;
  const middlePoint = middleTravelDay[getRandomInteger(0, middleTravelDay.length - 1)].city;
  const finalPoint = lastTravelDay[lastTravelDay.length - 1].city;

  return {
    firstPoint,
    middlePoint,
    finalPoint,
  };
};
/**
 * @description find start day travel and finally day travel;
 * @return {{firstDay, lastDay: (string|string)}}
 */
const getTravelDays = () => {
  const firstDay = travelPointAll[0].day;
  const lastDay = travelPointAll[travelPointAll.length - 1].day;

  return {
    firstDay,
    lastDay,
  };
};

export const travelPoints = getTravelPoints();
export const travelDays = getTravelDays();
