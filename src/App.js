import React, { useState } from "react";
import Node from "./components/Node.js";

import "./navSelector.css";
import "./grid.css";

function App() {
  const [rowsCount, setRowsCount] = useState(15);
  const [columnCount, setColumnCount] = useState(30);
  const [selection, setSelection] = useState("START");

  const [startRow, setStartRow] = useState(null);
  const [startCol, setStartCol] = useState(null);

  const [finishRow, setFinishRow] = useState(null);
  const [finishCol, setFinishCol] = useState(null);

  const [reset, setReset] = useState(false);

  const [isVisited, setIsVisited] = useState([]);

  const goPath = () => {
    let visited = [];
    let startLocation = [startRow, startCol];

    for (let i = 0; i < rowsCount; i++) {
      for (let j = 0; j < columnCount; j++) {}
    }

    console.log(startLocation);
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
                  <button onClick={() => setReset(true)}>Reset</button>
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
                        isVisited={isVisited}
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
