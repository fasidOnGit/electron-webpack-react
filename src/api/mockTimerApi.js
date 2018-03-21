import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
let courses = {
    start : "",
    end: ""
};

class StoreAPI {
  static getAllDate() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, courses));
      }, delay);
    });
  }

  static saveTime(flag , time) {
      let timer='';
    if(flag === "start"){
        timer = Object.assign({}, {start:time});
    }else if(flag==="end"){
        timer = Object.assign({}, {end:time});
    }else{
        return Promise.reject('Invalid Flag');
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          courses = timer;
        resolve(Object.assign({},courses));
      }, delay);
    });
  }

  static clearAllTime() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        courses = Object.assign({} , {start : "" , end: ""});
        resolve();
      }, delay);
    });
  }
}

export default StoreAPI;
