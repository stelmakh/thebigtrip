import {getTimeBetween, getMomentTimeAsString, getMomentISOFormat} from '../utils/moment';
import {capitalize} from '../utils/common';
import AbstractView from './abstract';

/**
 * @param {array|null} additionalOffers
 * @return {string}
 */
const createAdditionalOfferTemplate = (additionalOffers) => {
  return additionalOffers !== null
    ? additionalOffers.map((offer) => {
      return (
        `<li class="event__offer">
       <span class="event__offer-title">${offer.title}</span>
       &plus;
       &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
     </li>`
      );
    }).join(``)
    : ``;
};

/**
 * @param {object} eventData
 * @return {string}
 */
const createEventTemplate = (eventData) => {
  const {point, city, startTime, endTime, price, additionalOffer} = eventData;
  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${capitalize(point)} to ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${getMomentISOFormat(startTime)}">${getMomentTimeAsString(startTime)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getMomentISOFormat(endTime)}">${getMomentTimeAsString(endTime)}</time>
        </p>
        <p class="event__duration">${getTimeBetween(startTime, endTime)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createAdditionalOfferTemplate(additionalOffer)}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class EventsItem extends AbstractView {
  constructor(eventData) {
    super();
    this._eventDate = eventData;
  }
  getTemplate() {
    return createEventTemplate(this._eventDate);
  }
  setEditHandler(cb) {
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, cb);
  }
}
