import {humanizeDate, createElement} from '../utils';

export const createDayTemplate = (info, index) => {
  const {day} = info;
  return `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${index + 1}</span>
          <time class="day__date" datetime="2019-03-18">${humanizeDate(day)}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`;
};

export default class Day {
  constructor(info, index) {
    this._element = null;
    this._info = info;
    this._index = index;
  }
  getTemplate() {
    return createDayTemplate(this._info, this._index);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._info, this._index));
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
