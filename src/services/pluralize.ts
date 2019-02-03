export function getPluralized(count:number, message:string) {
    return count > 1 ? message + 's' : message;
  }
  
  export function getPluralizedWithCount(count:number, message:string) {
    return count > 1 ? count + ' ' + message + 's' : count + ' ' + message;
  }