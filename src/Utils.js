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

const millisecondsToDays = (miliseconds) => {
    return Math.floor(miliseconds / 1000 / 60 / 60 / 24);
}


export function selectionSort(array) {
  let temp;
  let sortedArray = array;
  let size = sortedArray.length;


  for (let i = 0; i < size; i++) {
    let min = sortedArray[i];
    let min_index = i;

    for (let j = i + 1; j < size; j++) {
      if (sortedArray[j].score > min.score) {
        min = sortedArray[j];
        min_index = j;
      }
    }

    temp = sortedArray[i];
    sortedArray[i] = min;
    sortedArray[min_index] = temp;
  }


  return sortedArray;
}
