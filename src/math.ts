const regression = require('regression');

export interface IGraph{
  points: number[][]
}

class Mathf{
  getBestFit(graph: IGraph){
    return regression.exponential(graph.points);
  }
}

export default new Mathf();

