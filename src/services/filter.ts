import every from 'lodash/fp/every';
import some from 'lodash/fp/some';

export function getOrCombined(filters:any) {
  return (obj:any) => some((fn) => fn(obj), filters);
}

export function getAndCombined(filters:any) {
  return (obj:any) => every((fn) => fn(obj), filters);
}