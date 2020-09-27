import {render, renderPosition} from '../utils/render';
import EventPointsView from '../components/event-point';
import SortTripView from '../components/sort-trip';
import NoPoint from '../components/no-point';
import PointController from './point-controller';
import {SortType} from '../constants';
import {sortTaskPrice, sortTaskTime} from '../utils/sort';

export default class TripController {
  constructor(container, allDayData) {
    this._sortComponent = new SortTripView();
    this._container = container;
    this._allDay = allDayData || [];
    // shallow copy for default sort
    this._defaultDay = this._allDay.slice();
    this._currentSortType = SortType.EVENT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    if (this._allDay.length === 0) {
      this._renderNoEvents();
      return;
    }
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
        this._allDay.sort(sortTaskTime);
        break;
      case SortType.PRICE:
        this._allDay.sort(sortTaskPrice);
        break;
      default:
        this._allDay = this._defaultDay.slice();
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
    this._allDay.forEach((data, index) => {
      const dayPoint = new PointController(this._tripDays);
      dayPoint.render(data, index);
    });
  }

  _renderNoEvents() {
    render(this._container, new NoPoint(), renderPosition.BEFOREEND);
  }
}
