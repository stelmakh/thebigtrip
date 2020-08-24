/**
 * @description generate random integer
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
export const getRandomInteger = (a = 0, b = 1)=> {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const humanizeDate = (date)=> {
  return date.toLocaleString(
      `en-US`, {
        day: `numeric`,
        month: `short`
      });
};

// Transform date to hours and minutes
export function prettyDate(time) {
  return time.toLocaleTimeString(navigator.language, {
    hour12: false,
    hour: `2-digit`,
    minute: `2-digit`,
  });
}

export const getTimeBetween = (startDate, endDate) => {
  const gap = endDate.getTime() - startDate.getTime();

  const day = Math.floor(gap / 1000 / 60 / 60 / 24);
  const hour = Math.floor((gap / 1000 / 60 / 60) % 24);
  const minute = Math.floor((gap / 1000 / 60) % 60);

  let gapString = ``;

  if (day > 0) {
    gapString += day > 9
      ? day
      : `0` + day;
    gapString += `D `;
  }
  if (hour > 0) {
    gapString += hour > 9
      ? hour
      : `0` + hour;
    gapString += `H `;
  }
  if (minute > 0) {
    gapString += minute > 9
      ? minute
      : `0` + minute;
    gapString += `M`;
  }

  return gapString;
};


export function diffMinutes(dt2, dt1) {

  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff = diff / 60;
  return Math.abs(Math.round(diff));

}
