import {createMenuTemplate} from './components/site-menu';
import {createFiltersTemplate} from './components/filters';
import {createSortTemplate} from './components/sort-trip';
import {createEventEditTemplate} from './components/event-edit';
import {createEventPointTemplate} from './components/event-point';
import {createEventTemplate} from './components/events-item';
import {createTripInfoTemplate} from './components/trip-info';
import {createTripCostTemplate} from './components/trip-cost';
import {generateTravelPoint} from './mock/point';

console.log(generateTravelPoint());
const EVENT_COUNT = 7;
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
render(tripBoardsElement, createEventEditTemplate());

// trip days container
render(tripBoardsElement, createEventPointTemplate());

const tripsEventsListElement = tripBoardsElement.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i += 1) {
  // day event list
  render(tripsEventsListElement, createEventTemplate());
}

// top page info (price, points)
render(tripMainElement, createTripInfoTemplate(), `afterbegin`);
const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

// top trip info cost
render(tripInfoElement, createTripCostTemplate());

