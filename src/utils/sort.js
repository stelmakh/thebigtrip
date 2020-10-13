import moment from 'moment';

export const sortTaskPrice = (taskA, taskB) => {
  // console.log(taskA.info, taskB.info);
  taskA.info.sort((item1, item2)=>{
    return item2.price - item1.price;
  });
  //
  taskB.info.sort((item1, item2)=>{
    return item2.price - item1.price;
  });

  return taskA.info[0].price - taskB.info[0].price;
};

export const sortTaskTime = (taskA, taskB) => {
  return taskA.info[0].startTime.diff(taskB.info[0].startTime, `hours`);
};
