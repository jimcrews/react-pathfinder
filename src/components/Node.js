import React, { useState, useEffect } from "react";
import { FaBullseye } from "react-icons/fa";

import "./node.css";

export default function Node({
  row,
  column,
  selection, // 'START' or 'FINISH' or 'WALL'
  startRow,
  startCol,
  setStartRow,
  setStartCol,
  finishRow,
  finishCol,
  setFinishRow,
  setFinishCol,
  reset,
  setReset,
  isVisited,
  updateGraph,
  resultPath,
  resultDistance,
}) {
  const [isStartNode, setIsStartNode] = useState(false);
  const [isFinishNode, setIsFinishNode] = useState(false);
  const [isWall, setIsWall] = useState(false);
  const [isPath, setIsPath] = useState(false);

  useEffect(() => {
    if (row === startRow && column === startCol) {
      setIsStartNode(true);
    } else {
      setIsStartNode(false);
    }
  }, [startRow, startCol, column, row]);

  useEffect(() => {
    if (row === finishRow && column === finishCol) {
      setIsFinishNode(true);
    } else {
      setIsFinishNode(false);
    }
  }, [finishRow, finishCol, column, row]);

  useEffect(() => {
    if (reset) {
      setIsWall(false);
      setIsStartNode(false);
      setIsFinishNode(false);
      setIsPath(false);
      setReset(false);
    }
  }, [reset, setReset]);

  useEffect(() => {
    if (resultPath) {
      setIsPath(false);
      let coords = `${row},${column}`;
      for (let i = 0; i < resultPath.length; i++) {
        if (resultPath[i] === coords) {
          setIsPath(true);
        }
      }
    }
  }, [resultPath, row, column]);

  const handleNodeClickDrag = (e, row, col) => {
    if (e.buttons === 1 || e.buttons === 3) {
      if (selection === "WALL" && !isWall) {
        updateGraph(row, column, "WALL");
        setIsWall(true);
      }
    }
  };
  const handleNodeClicked = (row, col) => {
    if (selection === "WALL" && !isWall && !isStartNode && !isFinishNode) {
      updateGraph(row, column, "WALL");
      setIsWall(true);
    }
    if (selection === "WALL" && isWall) {
      updateGraph(row, column, "");
      setIsWall(false);
    }
    if (selection === "START" && !isStartNode && !isFinishNode && !isWall) {
      updateGraph(row, column, "START");
      setStartRow(row);
      setStartCol(column);
    }
    if (selection === "START" && isStartNode) {
      updateGraph(row, column, "");
      setIsStartNode(false);
    }
    if (selection === "FINISH" && !isFinishNode && !isStartNode && !isWall) {
      updateGraph(row, column, "FINISH");
      setFinishRow(row);
      setFinishCol(column);
    }
    if (selection === "FINISH" && isFinishNode) {
      updateGraph(row, column, "");
      setIsFinishNode(false);
    }
  };

  return (
    <div
      className="node"
      onMouseEnter={(e) => handleNodeClickDrag(e, row, column)}
      onMouseDown={() => handleNodeClicked(row, column)}
    >
      {isStartNode && (
        <span>
          <FaBullseye
            style={{ fontSize: "26px", paddingTop: "2px", color: "green" }}
          />
        </span>
      )}
      {isFinishNode && (
        <span>
          <FaBullseye
            style={{ fontSize: "26px", paddingTop: "2px", color: "red" }}
          />
        </span>
      )}
      {isWall && <span className="wall"></span>}

      {isPath && <span className="path"></span>}

      {!isStartNode && !isWall && !isFinishNode && !isVisited && !isPath && (
        <span></span>
      )}
    </div>
  );
}
