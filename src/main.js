import {createMenuTemplate} from './view/site-menu';
import {createFiltersTemplate} from './view/filters';
import {createSortTemplate} from './view/sort-trip';
import {createEventEditTemplate} from './view/event-edit';
import {createEventPointTemplate} from './view/event-point';
import {createEventTemplate} from './view/events-item';
import {createTripInfoTemplate} from './view/trip-info';
import {createTripCostTemplate} from './view/trip-cost';

const EVENT_COUNT = 3;

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

render(tripMainMenuElement, createMenuTemplate(), `afterend`);
render(tripControlElement, createFiltersTemplate());
render(tripBoardsElement, createSortTemplate());
render(tripBoardsElement, createEventEditTemplate());
render(tripBoardsElement, createEventPointTemplate());

const tripsEventsListElement = tripBoardsElement.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i += 1) {
  render(tripsEventsListElement, createEventTemplate());
}
render(tripMainElement, createTripInfoTemplate(), `afterbegin`);
const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createTripCostTemplate());

