import {humanizeDate} from '../utils';

export const createTripInfoTemplate = (travelPoints, travelDays) => {
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


