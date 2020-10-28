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

      /*
      // create north east neighbor
      if (i > 0 && j < totalColumns - 1) {
        neighbors[`${i - 1},${j + 1}`] = 1;
      }
      // create north west neighbor
      if (i > 0 && j > 0) {
        neighbors[`${i - 1},${j - 1}`] = 1;
      }
      */

      // create east neighbor
      if (j < totalColumns - 1) {
        neighbors[`${i},${j + 1}`] = 1;
      }
      // create south neighbor
      if (i < totalRows - 1) {
        neighbors[`${i + 1},${j}`] = 1;
      }
      /*
      // create south east neighbor
      if (i < totalRows && j < totalColumns - 1) {
        neighbors[`${i + 1},${j + 1}`] = 1;
      }
      // create south west neighbor
      if (i < totalRows - 1 && j > 0) {
        neighbors[`${i + 1},${j - 1}`] = 1;
      }
      */

      // create west neighbor
      if (j > 0) {
        neighbors[`${i},${j - 1}`] = 1;
      }

      graph[`${i},${j}`] = neighbors;
    }
  }

  return graph;
}

export function update(row, column, nodeState) {
  if (nodeState === "") {
    let emptyLocation = `${row},${column}`;

    Object.keys(graph).forEach(function (key) {
      if (graph[key][emptyLocation]) {
        graph[key][emptyLocation] = 1;
      }
    });
  }

  if (nodeState === "FINISH") {
    // If finish is moved, rename finish back to co-ords
    if (finishLocation) {
      Object.defineProperty(
        graph,
        finishLocation,
        Object.getOwnPropertyDescriptor(graph, "finish")
      );
      delete graph["finish"];
    }

    finishLocation = `${row},${column}`;

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
  }

  if (nodeState === "START") {
    // If start is moved, rename start back to co-ords
    if (startLocation) {
      Object.defineProperty(
        graph,
        startLocation,
        Object.getOwnPropertyDescriptor(graph, "start")
      );
      delete graph["start"];
    }
    startLocation = `${row},${column}`;

    console.log(startLocation);

    Object.defineProperty(
      graph,
      "start",
      Object.getOwnPropertyDescriptor(graph, startLocation)
    );
    delete graph[startLocation];
  }

  if (nodeState === "WALL") {
    let wallLocation = `${row},${column}`;

    Object.keys(graph).forEach(function (key) {
      if (graph[key][wallLocation]) {
        graph[key][wallLocation] = Infinity;
      }
    });
  }

  return graph;
}

// helper
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
  console.log(graph);

  // track lowest cost to reach each node
  const trackedCosts = Object.assign({ finish: Infinity }, graph.start);

  // track paths
  const trackedParents = { finish: null };
  for (let child in graph.start) {
    trackedParents[child] = "start";
  }

  // track nodes that have already been processed
  const processedNodes = [];

  // Set initial node. Pick lowest cost node.
  let node = findLowestCostNode(trackedCosts, processedNodes);

  while (node) {
    let costToReachNode = trackedCosts[node];
    let childrenOfNode = graph[node];

    for (let child in childrenOfNode) {
      let costFromNodetoChild = childrenOfNode[child];
      let costToChild = costToReachNode + costFromNodetoChild;

      if (!trackedCosts[child] || trackedCosts[child] > costToChild) {
        trackedCosts[child] = costToChild;
        trackedParents[child] = node;
      }
    }
    processedNodes.push(node);
    node = findLowestCostNode(trackedCosts, processedNodes);
  }

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

  console.log(trackedCosts);
  console.log(optimalPath);

  return results;
}

export function clear() {
  startLocation = null;
  finishLocation = null;
}
