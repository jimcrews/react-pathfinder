/*
let graph = {
  start: { A: 5, B: 2 },
  A: { C: 4, D: 2 },
  B: { A: 8, D: 7 },
  C: { D: 6, finish: 3 },
  D: { finish: 1 },
  finish: {},
};
*/

/*
"4,3": {
    "3,3": 1
    ​​
    "3,4": 1
    ​​
    "3,2": 1
    ​​
    "4,4": 1
    ​​
    "4,2": 1
    ​​
    "5,3": 1
    ​​
    "5,4": 1
    ​​
    "5,2": 1
}
​​*/

let graph = {};

let startLocation = null;
let finishLocation = null;

export function create(totalRows, totalColumns) {
  // create empty graph

  graph = {};

  for (let i = 0; i < totalRows; i++) {
    for (let j = 0; j < totalColumns; j++) {
      graph[`${i},${j}`] = {};
    }
  }

  for (let i = 0; i < totalRows; i++) {
    for (let j = 0; j < totalColumns; j++) {
      let neighbors = {};
      // create north neighbor
      if (i > 0) {
        neighbors[`${i - 1},${j}`] = 1;
      }
      // create north east neighbor
      if (i > 0 && j < totalColumns) {
        neighbors[`${i - 1},${j + 1}`] = 1;
      }
      // create north west neighbor
      if (i > 0 && j > 0) {
        neighbors[`${i - 1},${j - 1}`] = 1;
      }

      // create east neighbor
      if (j < totalColumns) {
        neighbors[`${i},${j + 1}`] = 1;
      }
      // create south neighbor
      if (i < totalRows) {
        neighbors[`${i + 1},${j}`] = 1;
      }
      // create south east neighbor
      if (i < totalRows && j < totalColumns) {
        neighbors[`${i + 1},${j + 1}`] = 1;
      }
      // create south west neighbor
      if (i < totalRows && j > 0) {
        neighbors[`${i + 1},${j - 1}`] = 1;
      }

      // create west neighbor
      if (j > 0) {
        neighbors[`${i},${j - 1}`] = 1;
      }

      graph[`${i},${j}`] = neighbors;
    }
  }

  console.log(graph);
}

export function update(row, column, nodeState) {
  if (nodeState === "FINISH") {
    finishLocation = `${row},${column}`;

    /*
    // rename object key
    Object.defineProperty(
      graph,
      "finish",
      Object.getOwnPropertyDescriptor(graph, finishLocation)
    );
    delete graph[finishLocation];

    Object.keys(graph).forEach(function (key) {
      if (graph[key][finishLocation]) {
        delete Object.assign(graph[key], {
          finish: graph[key][finishLocation],
        })[finishLocation];
      }
    });
    */
  }

  if (nodeState === "START") {
    startLocation = `${row},${column}`;

    /*
    Object.defineProperty(
      graph,
      "start",
      Object.getOwnPropertyDescriptor(graph, startLocation)
    );
    delete graph[startLocation];
    */
  }

  console.log(graph);
}

export function get() {
  return graph;
}

const findLowestCostNode = (costs, processed) => {
  const knownNodes = Object.keys(costs);

  const lowestCostNode = knownNodes.reduce((lowest, node) => {
    if (lowest === null && !processed.includes(node)) {
      lowest = node;
    }
    if (costs[node] < costs[lowest] && !processed.includes(node)) {
      lowest = node;
    }
    return lowest;
  }, null);

  return lowestCostNode;
};

// function that returns the minimum cost and path to reach Finish
export function go() {
  console.log("Graph: ");
  console.log(graph);

  // track lowest cost to reach each node
  const trackedCosts = Object.assign({ finish: Infinity }, graph.start);
  console.log("Initial `costs`: ");
  console.log(trackedCosts);

  // track paths
  const trackedParents = { finish: null };
  for (let child in graph.start) {
    trackedParents[child] = "start";
  }
  console.log("Initial `parents`: ");
  console.log(trackedParents);

  // track nodes that have already been processed
  const processedNodes = [];

  // Set initial node. Pick lowest cost node.
  let node = findLowestCostNode(trackedCosts, processedNodes);
  console.log("Initial `node`: ", node);

  console.log("while loop starts: ");
  while (node) {
    console.log(`***** 'currentNode': ${node} *****`);
    let costToReachNode = trackedCosts[node];
    let childrenOfNode = graph[node];

    for (let child in childrenOfNode) {
      let costFromNodetoChild = childrenOfNode[child];
      let costToChild = costToReachNode + costFromNodetoChild;

      if (!trackedCosts[child] || trackedCosts[child] > costToChild) {
        trackedCosts[child] = costToChild;
        trackedParents[child] = node;
      }

      console.log("`trackedCosts`", trackedCosts);
      console.log("`trackedParents`", trackedParents);
      console.log("----------------");
    }

    processedNodes.push(node);

    node = findLowestCostNode(trackedCosts, processedNodes);
  }
  console.log("while loop ends: ");

  let optimalPath = ["finish"];
  let parent = trackedParents.finish;
  while (parent) {
    optimalPath.push(parent);
    parent = trackedParents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: trackedCosts.finish,
    path: optimalPath,
  };

  console.log(results);

  return results;
}
