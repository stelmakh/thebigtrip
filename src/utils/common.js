

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

