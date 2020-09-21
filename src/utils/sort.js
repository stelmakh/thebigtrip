import moment from 'moment';


export const sortTaskUp = (taskA, taskB) => {
  return taskA.day.hours() - taskB.day.hours();

};

export const sortTaskDown = (taskA, taskB) => {
  return taskB.day.hours() - taskA.day.hours();
};
