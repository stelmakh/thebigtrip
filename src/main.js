import SiteMenuView from './components/site-menu';
import FiltersView from './components/filters';
import SortTripView from './components/sort-trip';
import EventEditView from './components/event-edit';
import EventPointsView from './components/event-point';
import EventsItemView from './components/events-item';
import {createTripInfoTemplate} from './components/trip-info';
import {createTripCostTemplate} from './components/trip-cost';
import {createDayTemplate} from './components/day';
import {allPointInfo, travelPointAll, travelDays, travelPoints} from './computed';
import {EVENT_DAY} from './constants';
import {renderElement, renderTemplate, renderPosition} from './utils';


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
renderElement(tripBoardsElement, new EventPointsView().getElement(), renderPosition.BEFOREEND);

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
    renderElement(item, new EventsItemView(dayInfo[i]).getElement(), renderPosition.BEFOREEND);
  }
});

// top page info (price, points)
renderTemplate(tripMainElement, createTripInfoTemplate(travelPoints, travelDays), `afterbegin`);
const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

// top trip info cost
renderTemplate(tripInfoElement, createTripCostTemplate());

