import {render, renderPosition, replace} from '../utils/render';
import DayView from '../components/day';
import EventEditView from '../components/event-edit';
import EventsItemView from '../components/events-item';

export default class PointController {
  constructor(container) {
    this._container = container;
  }

  render(data, index) {
    const day = new DayView(data, index);
    const eventsList = day.getElement().querySelector(`.trip-events__list`);
    render(this._container, day, renderPosition.BEFOREEND);
    this._renderEventsInDay(eventsList, data.info);
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

  _renderEventsInDay(day, info) {
    const dayInfo = this._sortEventsByTime(info);
    for (const eventInfo of dayInfo) {
      this._renderEvent(day, eventInfo);
    }
  }

  _sortEventsByTime(eventItem) {
    return eventItem.sort((a, b) => {
      return a.startTime.diff(b.startTime);
    });
  }
}
