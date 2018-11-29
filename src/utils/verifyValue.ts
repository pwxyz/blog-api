
import haveValue from './haveValue';


//注意：本函数只检测一级key值是否存在，{}与[]为true
const verifyValue = (keyArr: Array<string>, obj: Object) => {
  try {
    let objs = {};
    keyArr.forEach(i => {
      if (haveValue(obj[i])) {
        objs[i] = obj[i];
      }
    });
    return objs;
  }
  catch (err) {
    console.error(err);
    return {};
  }
};

export default verifyValue;