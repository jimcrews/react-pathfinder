import React, { useState } from "react";
import Grid from "./components/Grid.js";
import NavSelector from "./components/NavSelector";

function App() {
  const [rowsCount, setRowsCount] = useState(15);
  const [columnCount, setColumnCount] = useState(30);
  const [selection, setSelection] = useState("START");

  return (
    <div className="App">
      <NavSelector
        rowsCount={rowsCount}
        setRowsCount={setRowsCount}
        columnCount={columnCount}
        setColumnCount={setColumnCount}
        setSelection={setSelection}
      />
      <Grid
        rowsCount={rowsCount}
        columnCount={columnCount}
        selection={selection}
      />
    </div>
  );
}

export default App;
