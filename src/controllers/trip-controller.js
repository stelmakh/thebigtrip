import {replace, render, renderPosition} from '../utils/render';
import DayView from '../components/day';
import EventsItemView from '../components/events-item';
import EventEditView from '../components/event-edit';
import EventPointsView from '../components/event-point';
import SortTripView from '../components/sort-trip';
import {SortType} from '../constants';
import {sortTaskPrice, sortTaskTime} from '../utils/sort';

export default class TripController {
  constructor(container, allDayData, allPointInfo) {
    this._sortComponent = new SortTripView();
    this._container = container;
    this._allPointInfo = allPointInfo;
    this._allDay = allDayData;
    // shallow copy for default sort
    this._defaultDay = this._allPointInfo.slice();

    this._currentSortType = SortType.EVENT;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  render() {
    this._renderSort();
    this._renderDaysContainer();
    this._renderDays();
  }

  _renderSort() {
    render(this._container, this._sortComponent, renderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _sortTasks(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.TIME:
        this._allPointInfo.sort(sortTaskTime);
        break;
      case SortType.PRICE:
        this._allPointInfo.sort(sortTaskPrice);
        break;
      default:
        this._allPointInfo = this._defaultDay.slice();
    }

    this._currentSortType = sortType;
  }

  _clearTaskList() {
    this._tripDays.innerHTML = ``;
  }

  _handleSortTypeChange(sortType) {
    // Exit if current sort type equal click sort type
    if (this._currentSortType === sortType) {
      return;
    }
    // - Сортируем задачи
    this._sortTasks(sortType);
    // - Очищаем список
    this._clearTaskList();
    // - Рендерим список заново
    this._renderDays();
    // this._renderEventsInDay();
  }

  _renderDaysContainer() {
    render(this._container, new EventPointsView(), renderPosition.BEFOREEND);
    this._tripDays = this._container.querySelector(`.trip-days`);
  }

  _renderDays() {
    for (const [index, travelDay] of this._allDay.entries()) {
      const day = new DayView(travelDay, index);
      const eventsList = day.getElement().querySelector(`.trip-events__list`);
      render(this._tripDays, day, renderPosition.BEFOREEND);
      this._renderEventsInDay(eventsList, travelDay.info);
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
