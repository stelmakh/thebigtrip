import {getRandomInteger} from '../utils';

const points = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
const cities = [`Oslo`, `Stockholm`, `Los-Angeles`, `New-York`, `Boston`, `Pekin`];
const offersList = [{title: `choose meal`, price: 10}, {title: `upgrade to comfort class`, price: 50},
  {title: `lanch`, price: 40}, {title: `transfer from the airport`, price: 20}, {title: `city tour`, price: 180}];


const getRandomArrayItem = (arr)=> {
  const randomIndex = getRandomInteger(0, arr.length - 1);
  return arr[randomIndex];
};

const generateAdditionalOffer = ()=> {
  // return getRandomArrayItem(offersList);
  return Array(getRandomInteger(0, offersList.length - 1))
    .fill()
    .map(() => getRandomArrayItem(offersList));
};

const generateDescription = ()=> {
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

export const generateTravelPoint = ()=> {
  const additionalOffer = generateAdditionalOffer();
  const point = getRandomArrayItem(points);
  const city = getRandomArrayItem(cities);
  const description = generateDescription();
  return {
    point,
    city,
    additionalOffer,
    // additionalOffer: additionalOffer.length === 0 ? null : additionalOffer,
    description,
  };
};


