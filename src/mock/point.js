const points = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
const cities = [`Oslo`, `Stockholm`, `Los-Angeles`, `New-York`, `Boston`, `Pekin`];
const offersList = [{title: `choose meal`, price: 10}, {title: `upgrade to comfort class`, price: 50},
  {title: `lanch`, price: 40}, {title: `transfer from the airport`, price: 20}, {title: `city tour`, price: 180}];

/**
 * @description generate random integer
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
const getRandomInteger = (a = 0, b = 1)=> {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayItem = (arr)=> {
  const randomIndex = getRandomInteger(0, arr.length - 1);
  return arr[randomIndex];
};

const generateAdditionalOffer = ()=> {
  return getRandomArrayItem(offersList);
};

export const generateTravelPoint = ()=> {
  const additionalOffer = new Array(getRandomInteger(0, offersList.length - 1)).fill().map(generateAdditionalOffer);
  return {
    point: getRandomArrayItem(points),
    city: getRandomArrayItem(cities),
    additionalOffer: additionalOffer.length === 0 ? null : additionalOffer,
  };
};


