const dataset = [
  1,2,3,4,5,6,7,8,9
]

interface ICorrupt{
  index: number;
  value: any;
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

console.log(search(-5))
