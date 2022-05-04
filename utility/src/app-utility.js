// Anything exported from this file is importable by other in-browser modules.

import { BehaviorSubject } from 'rxjs';

const apiCache = new Map();
export function getData(url) {
  const data = apiCache.get(url);

  if (data) {
    console.log('Cached API');
    return Promise.resolve(data);
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = {
          data: 10,
        };
        apiCache.set(url, result);
        console.log('Actual API');
        resolve(result);
      }, 2000);
    });
  }
}

export const state$ = new BehaviorSubject({});
