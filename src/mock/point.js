import {getRandomInteger, generateStartTime, generateEndTime, generateStartMoment, generateEndMoment} from '../utils';

const points = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
const cities = [`Oslo`, `Stockholm`, `Los-Angeles`, `New-York`, `Boston`, `Pekin`];
const offersList = [{title: `choose meal`, price: 10}, {title: `upgrade comfort`, price: 50},
  {title: `lanch`, price: 40}, {title: `airport transfer`, price: 20}, {title: `city tour`, price: 180}];


const getRandomArrayItem = (arr)=> {
  const randomIndex = getRandomInteger(0, arr.length - 1);
  return arr[randomIndex];
};

const generateAdditionalOffer = ()=> {
  // return getRandomArrayItem(offersList);
  const noUniqueOffers = new Array(getRandomInteger(0, offersList.length - 1))
    .fill()
    .map(() => getRandomArrayItem(offersList));
  // only unique offers return
  return [...new Set(noUniqueOffers)];
};

const generateDestination = ()=> {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  let description = ``;
  const maxCount = 5;
  let count = 0;
  const maxPhoto = 6;
  // Чтоб сгенерировалось максимум 5 предложений в массиве
  for (const item of descriptions) {
    if (count >= maxCount) {
      break;
    }
    if ((getRandomInteger(0, 1))) {
      description += item;
      count++;
    }
  }

  return {
    description,
    photos: Array(getRandomInteger(0, maxPhoto)).fill().map(() => {
      return `http://picsum.photos/248/152?r=${getRandomInteger(0, 200)}`;
    })
  };
};


const generatePrice = ()=> {
  return 10 * (getRandomInteger(1, 30));
};

export const generateTravelPoint = ()=> {
  const additionalOffer = generateAdditionalOffer();
  const startTime = generateStartMoment();
  return {
    price: generatePrice(),
    point: getRandomArrayItem(points),
    city: getRandomArrayItem(cities),
    additionalOffer: additionalOffer.length === 0 ? null : additionalOffer,
    description: generateDestination(),
    startTime,
    endTime: generateEndMoment(startTime),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};


