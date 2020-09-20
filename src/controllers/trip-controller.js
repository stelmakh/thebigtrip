import {replace, render, renderPosition} from '../utils/render';
import DayView from '../components/day';
import EventsItemView from '../components/events-item';
import EventEditView from '../components/event-edit';
import EventPointsView from '../components/event-point';
import SortTripView from '../components/sort-trip';

export default class TripController {
  constructor(container, allDayData, allPointInfo) {
    this._sortComponent = new SortTripView();
    this._container = container;
    this._allPointInfo = allPointInfo;
    this._allDay = allDayData;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  render() {
    this._renderSort();
    this._renderDaysContainer();
    this._renderDays();
    this._renderEventsInDay();

  }

  _renderSort() {
    render(this._container, this._sortComponent, renderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange() {
    console.log(`1`);
  }

  _renderDaysContainer() {
    render(this._container, new EventPointsView(), renderPosition.BEFOREEND);
    this._tripDays = this._container.querySelector(`.trip-days`);
  }

  _renderDays() {
    for (const [index, travelDay] of this._allDay.entries()) {
      render(this._tripDays, new DayView(travelDay, index), renderPosition.BEFOREEND);
    }
  }

  _renderEvent(container, eventData) {
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
  }

  _renderEventsInDay() {
    const tripsEventsListElement = this._container.querySelectorAll(`.trip-events__list`);
    tripsEventsListElement.forEach((item, index) => {
      const dayInfo = this._sortEventsByTime(this._allPointInfo[index]);
      for (const day of dayInfo) {
        this._renderEvent(item, day);
      }
    });
  }

  _sortEventsByTime(eventItem) {
    return eventItem.sort((a, b) => {
      return a.startTime.diff(b.startTime);
    });
  }
}
