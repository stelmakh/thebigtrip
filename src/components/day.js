import {humanizeDate} from '../utils';

export const createDayTemplate = (info, index) => {
  const {day} = info;
  return `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${index + 1}</span>
          <time class="day__date" datetime="2019-03-18">${humanizeDate(day)}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`
}
