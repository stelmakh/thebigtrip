import SiteMenuView from './components/site-menu';
import FiltersView from './components/filters';
import SortTripView from './components/sort-trip';
import EventPointsView from './components/event-point';
import TripInfoView from './components/trip-info';
import TripCostView from './components/trip-cost';
import TripController from './controllers/trip-controller';
import {allPointInfo, travelPointAll, travelDays, travelPoints} from './computed';
import {render, renderPosition} from './utils/render';

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = tripMainElement.querySelector(`.trip-controls`);
const tripMainMenuElement = tripControlElement.querySelector(`.visually-hidden:first-of-type`);
const tripBoardsElement = document.querySelector(`.trip-events`);


// Menu template (Table, Stats)
render(tripMainMenuElement, new SiteMenuView(), renderPosition.AFTERBEGIN);

// top page info (price, points)
render(tripMainElement, new TripInfoView(travelPoints, travelDays).getElement(), renderPosition.AFTERBEGIN);
const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

// top trip info cost
render(tripInfoElement, new TripCostView(), renderPosition.BEFOREEND);

// Filter template (everything, future, past)
render(tripControlElement, new FiltersView(), renderPosition.BEFOREEND);

// sort buttons (event, time, price);
render(tripBoardsElement, new SortTripView(), renderPosition.BEFOREEND);

// trip days container
render(tripBoardsElement, new EventPointsView(), renderPosition.BEFOREEND);

const tripPresenter = new TripController(tripBoardsElement, travelPointAll, allPointInfo);
tripPresenter.render();


