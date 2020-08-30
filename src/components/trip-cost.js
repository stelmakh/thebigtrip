import {getRandomInteger} from '../utils';

export const createTripCostTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
       <p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${getRandomInteger(0,400)*10}</span></p>
     </section>`
  );
};
