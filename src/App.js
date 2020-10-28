import React, { useState, useEffect } from "react";
import Node from "./components/Node.js";

import * as graphApi from "./scripts/graph";

import "./navSelector.css";
import "./grid.css";

function App() {
  const [rowsCount, setRowsCount] = useState(26);
  const [columnCount, setColumnCount] = useState(40);
  const [selection, setSelection] = useState("START");

  const [startRow, setStartRow] = useState(null);
  const [startCol, setStartCol] = useState(null);

  const [finishRow, setFinishRow] = useState(null);
  const [finishCol, setFinishCol] = useState(null);

  const [resultPath, setResultPath] = useState(null);
  const [resultDistance, setResultDistance] = useState(null);

  //const [graph, setGraph] = useState(null);

  const [reset, setReset] = useState(false);

  useEffect(() => {
    graphApi.create(rowsCount, columnCount);
    graphApi.clear();
    setStartRow(null);
    setStartCol(null);
    setFinishRow(null);
    setFinishCol(null);
    setReset(true);
    setResultPath(null);
  }, [rowsCount, columnCount]);

  const goPath = () => {
    let results = graphApi.go();
    let distance = results.distance;
    let path = results.path;

    setResultPath(path);
    setResultDistance(distance);
  };

  const updateGraph = (row, column, nodeState) => {
    graphApi.update(row, column, nodeState);
    //console.log(row);
    //console.log(column);
    //console.log(nodeState);
  };

  const restart = () => {
    graphApi.create(rowsCount, columnCount);
    graphApi.clear();
    setStartRow(null);
    setStartCol(null);
    setFinishRow(null);
    setFinishCol(null);
    setReset(true);
    setResultPath(null);
  };

  return (
    <div className="App">
      <div className="nav-selector">
        <div className="nav-content">
          <table>
            <tbody>
              <tr>
                <td>Rows</td>
                <td>Columns</td>
                <td></td>
                <td>Placements</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <input
                    value={rowsCount}
                    onChange={(e) => setRowsCount(parseInt(e.target.value))}
                    type="number"
                    autoComplete="off"
                    required
                  />
                </td>
                <td>
                  <input
                    value={columnCount}
                    onChange={(e) => setColumnCount(parseInt(e.target.value))}
                    type="number"
                    autoComplete="off"
                    required
                  />
                </td>
                <td></td>
                <td>
                  <div onChange={(event) => setSelection(event.target.value)}>
                    <input
                      type="radio"
                      value="START"
                      name="selection"
                      defaultChecked
                    />
                    Start
                    <input type="radio" value="FINISH" name="selection" />
                    Finish
                    <input type="radio" value="WALL" name="selection" />
                    Wall
                  </div>
                </td>
                <td style={{ paddingLeft: "30px" }}>
                  <button onClick={() => restart()}>Reset</button>
                </td>
                <td style={{ paddingLeft: "5px" }}>
                  <button onClick={goPath}>Go</button>
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
                        resultDistance={resultDistance}
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
