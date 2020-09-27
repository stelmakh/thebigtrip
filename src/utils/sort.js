import moment from 'moment';


export const sortTaskPrice = (taskA, taskB) => {

  taskA.sort((item1, item2)=>{
    return item1.price - item2.price;
  });

  taskB.sort((item1, item2)=>{
    return item1.price - item2.price;
  });

  return taskA[0].price - taskB[0].price;
};

export const sortTaskTime = (taskA, taskB) => {
  console.log(taskA[0].startTime, taskB[0].startTime);
  return taskA[0].startTime.diff(taskB[0].startTime, `hours`);
};
