import {getMomentMonthAsString} from '../utils/moment';
import AbstractView from './abstract';

const createTripInfoTemplate = (travelPoints, travelDays) => {
  const {firstPoint, middlePoint, finalPoint} = travelPoints;
  const {firstDay, lastDay} = travelDays;

  return (
    `<section class="trip-main__trip-info  trip-info">
       <div class="trip-info__main">
          <h1 class="trip-info__title">${firstPoint} &mdash; ${middlePoint} &mdash; ${finalPoint}</h1>
          <p class="trip-info__dates">${getMomentMonthAsString(firstDay)}&nbsp;&mdash;&nbsp;${getMomentMonthAsString(lastDay)}</p>
       </div>
     </section>`
  );
};

export default class TripInfo extends AbstractView {
  constructor(travelPoints, travelDays) {
    super();
    this._travelPoints = travelPoints;
    this._travelDays = travelDays;
  }
  getTemplate() {
    return createTripInfoTemplate(this._travelPoints, this._travelDays);
  }
}

