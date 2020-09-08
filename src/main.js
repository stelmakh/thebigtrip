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
import {render, renderPosition} from './utils';

const test2 = allPointInfo
  .map((item) => {
    return item.reduce((sum, current) => sum + current.price, 0);
  }).reduce((sum, current)=> sum + current, 0);
console.log(test2);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-controls`);
const tripMainMenuElement = tripControlElement.querySelector(`.visually-hidden:first-of-type`);
const tripBoardsElement = document.querySelector(`.trip-events`);

// Menu template (Table, Stats)
render(tripMainMenuElement, new SiteMenuView().getElement(), renderPosition.AFTERBEGIN);

// Filter template (everything, future, past)
render(tripControlElement, new FiltersView().getElement(), renderPosition.BEFOREEND);

// sort buttons (event, time, price);
render(tripBoardsElement, new SortTripView().getElement(), renderPosition.BEFOREEND);

// trip days container
render(tripBoardsElement, new EventPointsView().getElement(), renderPosition.BEFOREEND);

const tripDays = tripBoardsElement.querySelector(`.trip-days`);

// renderTemplate day item
for (let i = 0; i < EVENT_DAY; i += 1) {
  render(tripDays, new DayView(travelPointAll[i], i).getElement(), renderPosition.BEFOREEND);
}

const eventRender = (container, eventData) => {
  const eventComponent = new EventsItemView(eventData);
  const eventEditComponent = new EventEditView(eventData);

  const replaceCardToForm = () => {
    container.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToCard = () => {
    container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscDown);
  });

  eventEditComponent.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscDown);
  });

  render(container, eventComponent.getElement(), renderPosition.BEFOREEND);
};


// renderTemplate day events in day
const tripsEventsListElement = tripBoardsElement.querySelectorAll(`.trip-events__list`);
tripsEventsListElement.forEach((item, index) => {
  const dayInfo = allPointInfo[index]
    .sort((a, b) => {
      return a.startTime.diff(b.startTime);
    });
  for (let i = 0; i < dayInfo.length; i += 1) {
    // render(item, new EventsItemView(dayInfo[i]).getElement(), renderPosition.BEFOREEND);
    eventRender(item, dayInfo[i]);
  }
});

// top page info (price, points)
render(tripMainElement, new TripInfoView(travelPoints, travelDays).getElement(), renderPosition.AFTERBEGIN);
const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

// top trip info cost
render(tripInfoElement, new TripCostView().getElement(), renderPosition.BEFOREEND);

