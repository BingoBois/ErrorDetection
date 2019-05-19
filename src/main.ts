
import mathf, {IGraph} from './math'

const dataset = [63.6, 44.6, 78.9, 76.7, 63.2, 52.4, 38.3, 69, 36.7, 66.5, 23.4, 17.2, 99.5, 10.6, 53]

function getPoints(pointAmount: number){
  let arr: number[] = [];
  for(let i = Math.ceil((0 - pointAmount)/2); i<Math.floor(pointAmount/2); i++){
    //3x^5+ix^3+3
    arr.push(3*Math.pow(i, 5) + Math.pow(i, 3) + 3)
  }
  return arr;
}

function toCoordinate(set: number[]): IGraph{
  let graph: IGraph = {points: []};
  dataset.forEach((val, index) => {
    graph.points.push([index, val])
  })
  return graph
}

let corruptArr: number[] = [];

let detectErrorArr: Array<IError> = [];
 
interface IError {
    index: number;
    errorValue: number;
}

interface ISearchResult{
  index: number;
  steps: number;
}

function search(goal: number, index?: number, steps: number = 1, leftBound: number = 0, rightBound: number = dataset.length - 1): ISearchResult{
  index = index === undefined ? Math.floor(dataset.length / 2) : index;

  if(dataset[index] < dataset[leftBound] || dataset[index] > dataset[rightBound]){
    throw new Error(`Error: Flaw in data detected: At Index \n Current Index: ${index} \n Left Bound Index: ${leftBound} \n Right Bound Index: ${rightBound}`)
  }

  if(dataset[index] === goal){
    return {index, steps};
  }else if(dataset[index] > goal){
    // Moving index to the left
    if(index <= 0){
      throw new Error("Data is not present in the data set")
    }
    rightBound = index;
    return search(goal, Math.floor(index / 2), ++steps, leftBound, rightBound);
  }else{
    // Moving index to the right
    if(index >= dataset.length){
      throw new Error("Data is not present in the data set")
    }
    leftBound = index;
    return search(goal, Math.floor(index + (index / 2)), ++steps, leftBound, rightBound);
  }
}

export function detectErrors(dataSet: Array<number>) {
    // We will detect errors by linearly going through all the numbers
    // We check them initially against index [0], and [len - 1] (Assuming these are not corrupt)
    // And if they are between the 2 numbers, we move n upwards, towards len - 1.
    detectErrorArr = [];
    let i: number = 0;
    let j: number = dataSet.length - 1;
    let index = i + 1;
    while (index < j) {
        if (isCorrupt(dataSet[index], dataSet[i], dataSet[j])) {
            const error = {
                errorValue: dataSet[index],
                index: index
            };
            console.log(error);
            detectErrorArr.push(error);
        } else {
            i = index;
        }
        index++;
    }
    return detectErrorArr;
}
 
export function detectErrorsBi(dataSet: Array<number>) {
    detectErrorArr = [];
    let i: number = 0;
    let j: number = dataSet.length - 1;
    let index = i + 1;
    let incLeft = true;
    while (index < j) {
        if (isCorrupt(dataSet[index], dataSet[i], dataSet[j])) {
            const error = {
                errorValue: dataSet[index],
                index: index
            };
            detectErrorArr.push(error);
        } else {
            if (incLeft) {
                i = index;
            } else {
                let tempJ = j - 1;
                while (isCorrupt(dataSet[tempJ], dataSet[i], dataSet[j])) {
                    const error = {
                        errorValue: dataSet[tempJ],
                        index: tempJ
                    };
                    detectErrorArr.push(error);
                    tempJ--;
                }
                j = tempJ;
            }
        }
        incLeft = !incLeft;
        index++;
    }
    return detectErrorArr;
}
 
function isCorrupt(current: number, min: number, max: number) {
    return current < min || current > max;
}
console.log(mathf.getBestFit({points: toCoordinate(getPoints(20)).points}))
//console.log(detectErrorsBi(dataset))
//console.log(search(-5))
