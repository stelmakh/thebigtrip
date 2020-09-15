import Abstract from '../components/abstract';

export const renderPosition = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
};
/**
 * render html element in container
 * @param {Element} container
 * @param {Component} child
 * @param {string} place
 */
export const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }
  if (child instanceof Abstract) {
    child = child.getElement();
  }


  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case renderPosition.BEFOREEND:
      container.append(child);
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

export const replace = (newChild, oldChild) => {
  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }
  const parent = oldChild.parentElement;

  if (parent === null && newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};
