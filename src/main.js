import SiteMenuView from './components/site-menu';
import FiltersView from './components/filters';
import SortTripView from './components/sort-trip';
import EventEditView from './components/event-edit';
import EventPointsView from './components/event-point';
import EventsItemView from './components/events-item';
import TripInfoView from './components/trip-info';
import TripCostView from './components/trip-cost';
import DayView from './components/day';
import {allPointInfo, travelPointAll, travelDays, travelPoints} from './computed';
import {EVENT_DAY} from './constants';
import {render, replace, renderPosition} from './utils/render';

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-controls`);
const tripMainMenuElement = tripControlElement.querySelector(`.visually-hidden:first-of-type`);
const tripBoardsElement = document.querySelector(`.trip-events`);

// Menu template (Table, Stats)
render(tripMainMenuElement, new SiteMenuView(), renderPosition.AFTERBEGIN);

// Filter template (everything, future, past)
render(tripControlElement, new FiltersView(), renderPosition.BEFOREEND);

// sort buttons (event, time, price);
render(tripBoardsElement, new SortTripView(), renderPosition.BEFOREEND);

// trip days container
render(tripBoardsElement, new EventPointsView(), renderPosition.BEFOREEND);

const tripDays = tripBoardsElement.querySelector(`.trip-days`);

// renderTemplate day item
for (let i = 0; i < EVENT_DAY; i += 1) {
  render(tripDays, new DayView(travelPointAll[i], i), renderPosition.BEFOREEND);
}

const eventRender = (container, eventData) => {
  const eventComponent = new EventsItemView(eventData);
  const eventEditComponent = new EventEditView(eventData);

  const onEscDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replace(eventComponent, eventEditComponent);
      document.removeEventListener(`keydown`, onEscDown);
    }
  };

  eventComponent.setEditHandler(() => {
    replace(eventEditComponent, eventComponent);
    document.addEventListener(`keydown`, onEscDown);
  });

  eventEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replace(eventComponent, eventEditComponent);
    document.removeEventListener(`keydown`, onEscDown);
  });

  eventEditComponent.setCancelHanlder((evt) => {
    evt.preventDefault();
    replace(eventComponent, eventEditComponent);
    document.removeEventListener(`keydown`, onEscDown);
  });

  render(container, eventComponent, renderPosition.BEFOREEND);
};


// renderTemplate day events in day
const tripsEventsListElement = tripBoardsElement.querySelectorAll(`.trip-events__list`);
tripsEventsListElement.forEach((item, index) => {
  const dayInfo = allPointInfo[index]
    .sort((a, b) => {
      return a.startTime.diff(b.startTime);
    });
  for (let i = 0; i < dayInfo.length; i += 1) {
    eventRender(item, dayInfo[i]);
  }
});

// top page info (price, points)
render(tripMainElement, new TripInfoView(travelPoints, travelDays).getElement(), renderPosition.AFTERBEGIN);
const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

// top trip info cost
render(tripInfoElement, new TripCostView(), renderPosition.BEFOREEND);

