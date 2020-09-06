export const renderPosition = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
};
/**
 * render html element in container
 * @param {HTMLElement} container
 * @param {HTMLElement} element
 * @param {string} place
 */
export const renderElement = (container, element, place) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

/**
 * renderTemplate HTML
 * @param {object} container
 * @param {string} template
 * @param {string} place
 */
export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

/**
 * create element in empty div and return without this div
 * @param {string} template
 * @return {ChildNode}
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

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

export const humanizeDate = (date) => {
  return date.toLocaleString(
      `en-US`, {
        day: `numeric`,
        month: `short`,
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

export const getDateISOFormat = (date) => {
  return date.toISOString();
};

/**
 * Generate start event date
 * @return {Date}
 */
export const generateStartTime = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const startTime = new Date();
  startTime.setDate(startTime.getDate() + daysGap);
  const hours = getRandomInteger(0, 23);
  const minutes = 5 * getRandomInteger(0, 11);

  startTime.setHours(hours, minutes, 0, 0);
  return new Date(startTime);
};

/**
 * Generate end event date
 * @param {Date} startTime
 * @return {Date}
 */
export const generateEndTime = (startTime) => {
  const endTime = new Date(startTime);
  const day = getRandomInteger(0, 2);
  const hour = getRandomInteger(0, 23);
  const minutes = 5 * getRandomInteger(0, 11);
  endTime.setTime(startTime.getTime() + (day * 24 * 60 * 60 * 1000) + (hour * 60 * 60 * 1000) + (minutes * 60 * 1000));
  return new Date(endTime);
};
