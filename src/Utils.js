export const getTimeDifference = (date) => {
let today = new Date();
let givenDate = new Date(date);

let daysInBetween = millisecondsToDays(today.getTime()) - millisecondsToDays(givenDate.getTime());

if(daysInBetween <= 1){return "today"}
if(daysInBetween > 7 && daysInBetween < 14 ) {return '1 week ago'}
if(daysInBetween > 14){ return `${Math.floor(daysInBetween/7)} weeks ago`}
if(daysInBetween > 29 && daysInBetween < 58){ return `${Math.floor(daysInBetween/4/7)} month ago`}
if(daysInBetween > 60){ return `${Math.floor(daysInBetween/4/7)} months ago`}
if(daysInBetween > 1 ){return `${daysInBetween} days ago`}
}

const print = (something) => console.log(something);

const millisecondsToDays = (miliseconds) => {
    return Math.floor(miliseconds / 1000 / 60 / 60 / 24);
}




export const arrayToSet = (array) => {
    const setFromArray = new Set();
    array.forEach(element => setFromArray.add(element));

    return setFromArray;
}

export const setToArray = (set) => {
    const arrayFromSet = [];
    set.forEach(element => arrayFromSet.push(element));
    return arrayFromSet;
}

export const bubbleSort = (array) => {
  let isSorted = false;
  let temp;
  let sortedArray = array;

  while (isSorted === false) {
    for (let i = 0; i < sortedArray.length-1; i++) {
      // check adjacent values 
      if(sortedArray[i] > sortedArray[i+1]){
        // if not in order set sorted to false
        isSorted = false;
        // switch the positions
        temp = sortedArray[i];
        sortedArray[i] = sortedArray[i+1];
        sortedArray[i+1] = temp;
      } else {
        isSorted = true;
      }
    }    
  }

  return sortedArray;
}

// const example = [1,5,9,8,4,7,5,5,10,15,30];

// print(this.bubbleSort(example));
