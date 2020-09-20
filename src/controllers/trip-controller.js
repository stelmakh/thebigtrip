import {EVENT_DAY} from '../constants';
import {render, renderPosition} from '../utils/render';
import DayView from '../components/day';

export default class TripController {
  constructor(container, allDayData) {
    this._container = container;
    // this._eventData = eventData;
    this._allDay = allDayData;
    this._eventDay = EVENT_DAY;
    this._tripDays = container.querySelector(`.trip-days`);
  }

  render() {
    this._renderDays();
  }

  _renderDays() {
    for (const [index, travelDay] of this._allDay.entries()) {
      render(this._tripDays, new DayView(travelDay, index), renderPosition.BEFOREEND);
    }
  }

  _renderEvent() {

  }
}
