import {getMomentMonthAsString} from '../utils/moment';
import AbstractView from './abstract';

export const createDayTemplate = (info, index) => {
  const {day} = info;
  return `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${index + 1}</span>
          <time class="day__date" datetime="2019-03-18">${getMomentMonthAsString(day)}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`;
};

export default class Day extends AbstractView {
  constructor(info, index) {
    super();
    this._info = info;
    this._index = index;
  }
  getTemplate() {
    return createDayTemplate(this._info, this._index);
  }
}
