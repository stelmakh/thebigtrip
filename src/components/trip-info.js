import {humanizeDate, createElement} from '../utils';

const createTripInfoTemplate = (travelPoints, travelDays) => {
  const {firstPoint, middlePoint, finalPoint} = travelPoints;
  const {firstDay, lastDay} = travelDays;

  return (
    `<section class="trip-main__trip-info  trip-info">
       <div class="trip-info__main">
          <h1 class="trip-info__title">${firstPoint} &mdash; ${middlePoint} &mdash; ${finalPoint}</h1>
          <p class="trip-info__dates">${humanizeDate(firstDay)}&nbsp;&mdash;&nbsp;${humanizeDate(lastDay)}</p>
       </div>
     </section>`
  );
};

export default class TripInfo {
  constructor(travelPoints, travelDays) {
    this._element = null;
    this._travelPoints = travelPoints;
    this._travelDays = travelDays;
  }
  getTemplate() {
    return createTripInfoTemplate(this._travelPoints, this._travelDays);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}

