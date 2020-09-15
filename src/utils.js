import moment from 'moment';


/**
 * generate random integer
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


/**
 * generate random start date between -dayGap and dayGap
 * @return {moment.Moment}
 */
export const generateStartMoment = () => {
  const maxDaysGap = 7;
  return moment()
    .add(getRandomInteger(-maxDaysGap, maxDaysGap), `days`)
    .hours(getRandomInteger(0, 23))
    .minutes(5 * getRandomInteger(0, 11));
};

/**
 * generate random event end date
 * @param {object} startMoment
 * @return {moment.Moment}
 */
export const generateEndMoment = (startMoment) => {
  return moment(startMoment)
    .add(getRandomInteger(1, 2), `days`)
    .hours(getRandomInteger(0, 23))
    .minutes(5 * getRandomInteger(0, 11));
};

/**
 * format date like '13:00'
 * @param {object}inputMoment
 * @return {string}
 */
export const getMomentTimeAsString = (inputMoment) => {
  return moment(inputMoment).format(`HH:mm`);
};

/**
 * format date like '04 or 11 or 15'
 * @param {object} inputMoment
 * @return {string}
 */
export const getMomentDaysAsString = (inputMoment) => {
  return moment(inputMoment).format(`DD`);
};

/**
 * format date like 'Sep 05'
 * @param {object} inputMoment
 * @return {string}
 */
export const getMomentMonthAsString = (inputMoment) => {
  return moment(inputMoment).format(`MMM DD`);
};

/**
 * Format date like '2020-09-14T11:05:56.926Z'
 * @param {object} inputMoment
 * @return {string}
 */
export const getMomentISOFormat = (inputMoment) => {
  return moment(inputMoment).toISOString();
};

/**
 * Format date like '20/09/14 06:55'
 * @param {object} inputMoment
 * @return {string}
 */
export const getMomentSlashedFormat = (inputMoment) => {
  return moment(inputMoment).format(`YY/MM/DD HH:mm`);
};

/**
 *
 * @param {object} startMoment
 * @param {object} endMoment
 * @return {string}
 */
export const getTimeBetween = (startMoment, endMoment) => {
  const day = moment(endMoment).diff(startMoment, `days`);
  const hour = moment(endMoment).diff(startMoment, `hours`) % 24;
  const minute = moment(endMoment).diff(startMoment, `minute`) % 60;
  let gapString = ``;
  if (day > 0) {
    gapString += day.toString().padStart(2, `0`) + `D `;
  }
  if (hour > 0) {
    gapString += hour.toString().padStart(2, `0`) + `H `;
  }
  if (minute > 0) {
    gapString += minute.toString().padStart(2, `0`) + `M `;
  }

  return gapString;

};

const test = generateStartMoment();
const test2 = generateEndMoment(test);
export const test1 = getTimeBetween(test, test2);
