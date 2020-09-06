import SiteMenuView from './components/site-menu';
import FiltersView from './components/filters';
import SortTripView from './components/sort-trip';
import EventEditView from './components/event-edit';
import {createEventPointTemplate} from './components/event-point';
import {createEventTemplate} from './components/events-item';
import {createTripInfoTemplate} from './components/trip-info';
import {createTripCostTemplate} from './components/trip-cost';
import {createDayTemplate} from './components/day';
import {EVENT_DAY} from './constants';
import {travelPoint} from './mock/travel';
import {getRandomInteger} from './utils';
import {renderElement, renderTemplate, renderPosition} from './utils';

// generate all mock day
const travelPointAll = new Array(EVENT_DAY)
  .fill(undefined)
  .map(travelPoint)
  .sort((a, b) => {
    return a.day.getTime() - b.day.getTime();
  });

// only info array
const allPointInfo = travelPointAll.map((item) => {
  return item.info;
});
/**
 * @description find travel points
 * @return {{finalPoint: string, firstPoint: string, middlePoint: string}}
 */
const findTravelPoints = () => {
  const firstTravelDay = allPointInfo[0];
  const middleTravelDay = allPointInfo[Math.round(allPointInfo.length / 2)];
  const lastTravelDay = allPointInfo[allPointInfo.length - 1];
  const firstPoint = firstTravelDay[0].city;
  const middlePoint = middleTravelDay[getRandomInteger(0, middleTravelDay.length - 1)].city;
  const finalPoint = lastTravelDay[lastTravelDay.length - 1].city;

  return {
    firstPoint,
    middlePoint,
    finalPoint
  };
};
/**
 * @description find start day travel and finally day travel;
 * @return {{firstDay, lastDay: (string|string)}}
 */
const findTravelDays = () => {
  const firstDay = travelPointAll[0].day;
  const lastDay = travelPointAll[travelPointAll.length - 1].day;

  return {
    firstDay,
    lastDay,
  };
};

const travelPoints = findTravelPoints();
const travelDays = findTravelDays();


const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-controls`);
const tripMainMenuElement = tripControlElement.querySelector(`.visually-hidden:first-of-type`);
const tripBoardsElement = document.querySelector(`.trip-events`);

// Menu template (Table, Stats)
renderElement(tripMainMenuElement, new SiteMenuView().getElement(), renderPosition.AFTERBEGIN);

// Filter template (everything, future, past)
renderElement(tripControlElement, new FiltersView().getElement(), renderPosition.BEFOREEND);

// sort buttons (event, time, price);
renderElement(tripBoardsElement, new SortTripView().getElement(), renderPosition.BEFOREEND);

// event edit or new event form
renderElement(tripBoardsElement, new EventEditView(allPointInfo[0][0]).getElement(), renderPosition.BEFOREEND);

// trip days container
renderTemplate(tripBoardsElement, createEventPointTemplate());

const tripDays = tripBoardsElement.querySelector(`.trip-days`);

// renderTemplate day item
for (let i = 0; i < EVENT_DAY; i += 1) {
  renderTemplate(tripDays, createDayTemplate(travelPointAll[i], i));
}

// renderTemplate day events in day
const tripsEventsListElement = tripBoardsElement.querySelectorAll(`.trip-events__list`);
tripsEventsListElement.forEach((item, index) => {
  const dayInfo = allPointInfo[index]
    .sort((a, b) => {
      return a.startTime.getTime() - b.startTime.getTime();
    });
  for (let i = 0; i < dayInfo.length; i += 1) {
    renderTemplate(item, createEventTemplate(dayInfo[i]));
  }
});

// top page info (price, points)
renderTemplate(tripMainElement, createTripInfoTemplate(travelPoints, travelDays), `afterbegin`);
const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

// top trip info cost
renderTemplate(tripInfoElement, createTripCostTemplate());

