import {createMenuTemplate} from './components/site-menu';
import {createFiltersTemplate} from './components/filters';
import {createSortTemplate} from './components/sort-trip';
import {createEventEditTemplate} from './components/event-edit';
import {createEventPointTemplate} from './components/event-point';
import {createEventTemplate} from './components/events-item';
import {createTripInfoTemplate} from './components/trip-info';
import {createTripCostTemplate} from './components/trip-cost';
import {createDayTemplate} from './components/day';
import {EVENT_DAY} from './constants';
import {travelPoint} from './mock/travel';

// generate all mock day
const travelPointAll = new Array(EVENT_DAY)
  .fill(undefined)
  .map(travelPoint)
  .sort((a, b) => {
    return a.day.getTime() - b.day.getTime();
  })

const allPointInfo = travelPointAll.map((item) => {
  return item.info;
})


/**
 * render HTML
 * @param {object} container
 * @param {string} template
 * @param {string} place
 */
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-controls`);
const tripMainMenuElement = tripControlElement.querySelector(`.visually-hidden:first-of-type`);
const tripBoardsElement = document.querySelector(`.trip-events`);

// Menu template (Table, Stats)
render(tripMainMenuElement, createMenuTemplate(), `afterend`);

// Filter template (everything, future, past)
render(tripControlElement, createFiltersTemplate());

// sort buttons (event, time, price);
render(tripBoardsElement, createSortTemplate());

// event edit or new event form
render(tripBoardsElement, createEventEditTemplate(allPointInfo[0][0]));

// trip days container
render(tripBoardsElement, createEventPointTemplate());

const tripDays = tripBoardsElement.querySelector('.trip-days');

// render day item
for (let i = 0; i < EVENT_DAY; i += 1) {
  render(tripDays, createDayTemplate(travelPointAll[i], i));
}

// render day events in day
const tripsEventsListElement = tripBoardsElement.querySelectorAll(`.trip-events__list`);
tripsEventsListElement.forEach((item, index) => {
  const dayInfo = allPointInfo[index];
  for (let i = 0; i < dayInfo.length; i += 1) {
    render(item, createEventTemplate(dayInfo[i]))
  }
})

// top page info (price, points)
render(tripMainElement, createTripInfoTemplate(), `afterbegin`);
const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

// top trip info cost
render(tripInfoElement, createTripCostTemplate());

