import React from "react";
import "./navSelector.css";

export default function NavSelector({
  rowsCount,
  setRowsCount,
  columnCount,
  setColumnCount,
  setSelection,
}) {
  return (
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
                <button>Reset</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
