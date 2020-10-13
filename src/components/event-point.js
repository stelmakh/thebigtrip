import AbstractView from './abstract';

const createEventPointTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class EventPoints extends AbstractView {
  getTemplate() {
    return createEventPointTemplate();
  }
}
