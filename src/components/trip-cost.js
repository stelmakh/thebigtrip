import {getRandomInteger, createElement} from '../utils';

const createTripCostTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
       <p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${getRandomInteger(0, 400) * 10}</span></p>
     </section>`
  );
};

export default class TripCost {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createTripCostTemplate();
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
