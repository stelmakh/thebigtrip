import AbstractView from './abstract';
import {allPointPrice} from '../computed';

const createTripCostTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
       <p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${allPointPrice}</span></p>
     </section>`
  );
};

export default class TripCost extends AbstractView {
  getTemplate() {
    return createTripCostTemplate();
  }
}
