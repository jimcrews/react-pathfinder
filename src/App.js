import React, { useState, useEffect } from "react";
import Node from "./components/Node.js";

// import * as graphApi from "./scripts/graph";

import "./navSelector.css";
import "./grid.css";

function App() {
  const [graph, setGraph] = useState({});
  const [startLocation, setStartLocation] = useState(null);
  const [finishLocation, setFinishLocation] = useState(null);

  const [rowsCount] = useState(35);
  const [columnCount] = useState(55);
  const [selection, setSelection] = useState("START");

  const [startRow, setStartRow] = useState(null);
  const [startCol, setStartCol] = useState(null);

  const [finishRow, setFinishRow] = useState(null);
  const [finishCol, setFinishCol] = useState(null);

  const [resultPath, setResultPath] = useState(null);
  const [showSeek, setShowSeek] = useState(false);

  const [visitedNodes, setVisitedNodes] = useState(null);
  //const [processedNodes, setProcessedNodes] = useState([]);

  const [reset, setReset] = useState(false);

  useEffect(() => {
    create(rowsCount, columnCount);
    clear();
    setStartRow(null);
    setStartCol(null);
    setFinishRow(null);
    setFinishCol(null);
    setReset(true);
    setResultPath(null);
  }, [rowsCount, columnCount]);

  useEffect(() => {
    if (startLocation) {
      Object.defineProperty(
        graph,
        "start",
        Object.getOwnPropertyDescriptor(graph, startLocation)
      );
      delete graph[startLocation];
    }
  }, [startLocation, graph]);

  useEffect(() => {
    if (finishLocation) {
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
  }, [finishLocation, graph]);
  /*
  useEffect(() => {
    console.log(visitedNodes);
  }, [visitedNodes]);
*/
  const goPath = () => {
    go();
  };

  const updateGraph = (row, column, nodeState) => {
    update(row, column, nodeState);
    //console.log(row);
    //console.log(column);
    //console.log(nodeState);
  };

  const restart = () => {
    create(rowsCount, columnCount);
    clear();
    setStartRow(null);
    setStartCol(null);
    setFinishRow(null);
    setFinishCol(null);
    setReset(true);
    setResultPath(null);
  };

  const create = (totalRows, totalColumns) => {
    // create empty graph
    let g = {};

    for (let i = 0; i < totalRows; i++) {
      for (let j = 0; j < totalColumns; j++) {
        g[`${i},${j}`] = {};
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

        g[`${i},${j}`] = neighbors;
      }
    }

    return setGraph(g);
  };

  const update = (row, column, nodeState) => {
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

        Object.keys(graph).forEach(function (key) {
          if (graph[key]["finish"]) {
            delete Object.assign(graph[key], {
              [finishLocation]: graph[key]["finish"],
            })["finish"];
          }
        });
      }

      setFinishLocation(`${row},${column}`);
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
      setStartLocation(`${row},${column}`);
    }

    if (nodeState === "WALL") {
      let wallLocation = `${row},${column}`;

      Object.keys(graph).forEach(function (key) {
        if (graph[key][wallLocation]) {
          graph[key][wallLocation] = Infinity;
        }
      });
    }

    //return graph;
  };

  const findLowestCostNode = (costs, processed) => {
    const knownNodes = Object.keys(costs);

    const lowestCostNode = knownNodes.reduce((lowest, node) => {
      if (lowest === null && !processed.includes(node)) {
        lowest = node;
      }
      if (costs[node] < costs[lowest] && !processed.includes(node)) {
        //log(node);
        //setVisitedNodes((visitedNodes) => [...visitedNodes, node]);

        lowest = node;
      }

      return lowest;
    }, null);

    return lowestCostNode;
  };

  const go = () => {
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
      if (node === "finish") {
        break;
      }
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

    setVisitedNodes(processedNodes);

    let optimalPath = ["finish"];
    let parent = trackedParents.finish;
    while (parent) {
      optimalPath.push(parent);
      parent = trackedParents[parent];
    }
    optimalPath.reverse();

    setResultPath(optimalPath);
  };

  const clear = () => {
    setStartLocation(null);
    setFinishLocation(null);
  };

  return (
    <div className="App">
      <div className="nav-selector">
        <div className="nav-content">
          <table>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td
                  style={{ position: "absolute" }}
                  onClick={() => setShowSeek(!showSeek)}
                >
                  Show Seek
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <div onChange={(event) => setSelection(event.target.value)}>
                    <label className="container">
                      Start
                      <input
                        type="radio"
                        value="START"
                        name="selection"
                        defaultChecked
                      />
                      <span className="checkmark"></span>
                    </label>

                    <label className="container">
                      Finish
                      <input type="radio" value="FINISH" name="selection" />
                      <span className="checkmark"></span>
                    </label>

                    <label className="container">
                      Wall
                      <input type="radio" value="WALL" name="selection" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </td>

                <td style={{ paddingLeft: "30px" }}>
                  <button onClick={() => restart()}>Reset</button>
                </td>
                <td style={{ paddingLeft: "5px" }}>
                  <button onClick={goPath} style={{ marginRight: "30px" }}>
                    Go
                  </button>
                </td>
                <td style={{ position: "absolute" }}>
                  <input
                    style={{ position: "relative", top: "12px", left: "20px" }}
                    type="checkbox"
                    checked={showSeek}
                    onChange={(event) => setShowSeek(event.target.checked)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid">
        <table>
          <thead></thead>
          <tbody>
            {new Array(rowsCount).fill(0).map((item, row) => (
              <tr key={row}>
                {new Array(columnCount).fill(0).map((item, column) => (
                  <td key={column}>
                    <div>
                      <Node
                        row={row}
                        column={column}
                        selection={selection}
                        startRow={startRow}
                        startCol={startCol}
                        setStartRow={setStartRow}
                        setStartCol={setStartCol}
                        finishRow={finishRow}
                        finishCol={finishCol}
                        setFinishRow={setFinishRow}
                        setFinishCol={setFinishCol}
                        reset={reset}
                        setReset={setReset}
                        updateGraph={updateGraph}
                        resultPath={resultPath}
                        visitedNodes={visitedNodes}
                        showSeek={showSeek}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
