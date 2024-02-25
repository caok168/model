const dayjs = require('dayjs');

export default function deepCopy(obj) {
  if (obj === null) return null;
  const result = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopy(obj[key]);
      } else result[key] = obj[key];
    }
  });
  return result;
}

export function timStampToChar(timStamp) {
  return timStamp ? dayjs(timStamp).format('YYYY-MM-DD HH:mm:ss') : '';
}

export function timeToChar(time, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  return time ? dayjs(time).format(formatStr) : '';
}
