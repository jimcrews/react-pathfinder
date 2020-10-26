import React, { useState } from "react";
import Node from "./Node.js";

import "./grid.css";

export default function Grid({ rowsCount, columnCount, selection }) {
  const [startRow, setStartRow] = useState(null);
  const [startCol, setStartCol] = useState(null);

  const [finishRow, setFinishRow] = useState(null);
  const [finishCol, setFinishCol] = useState(null);

  return (
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
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
