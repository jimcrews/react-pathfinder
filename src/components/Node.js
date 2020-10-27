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
}) {
  const [isStartNode, setIsStartNode] = useState(false);
  const [isFinishNode, setIsFinishNode] = useState(false);
  const [isWall, setIsWall] = useState(false);

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
      setReset(false);
    }
  }, [reset, setReset]);

  useEffect(() => {
    console.log(isVisited);
  }, [isVisited]);

  const handleNodeClickDrag = (e, row, col) => {
    if (e.buttons === 1 || e.buttons === 3) {
      if (selection === "WALL" && !isWall) {
        setIsWall(true);
      }
    }
  };
  const handleNodeClicked = (row, col) => {
    if (selection === "WALL" && !isWall && !isStartNode && !isFinishNode) {
      setIsWall(true);
    }
    if (selection === "WALL" && isWall) {
      setIsWall(false);
    }
    if (selection === "START" && !isStartNode && !isFinishNode && !isWall) {
      //setIsStartNode(true);
      setStartRow(row);
      setStartCol(column);
    }
    if (selection === "START" && isStartNode) {
      setIsStartNode(false);
    }
    if (selection === "FINISH" && !isFinishNode && !isStartNode && !isWall) {
      //setIsFinishNode(true);
      setFinishRow(row);
      setFinishCol(column);
    }
    if (selection === "FINISH" && isFinishNode) {
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

      {!isStartNode && !isWall && !isFinishNode && !isVisited && <span></span>}
    </div>
  );
}
