import {prettyDate, getTimeBetween, diffMinutes} from '../utils';

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
export const createEventTemplate = (eventData) => {
  const {point, city, startTime, endTime, price, additionalOffer} = eventData;
  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${point} to ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${prettyDate(startTime)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${prettyDate(endTime)}</time>
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


