import React, { useEffect } from "react";

import styles from "./Grid.module.css";

const Grid = (props) => {
  useEffect(() => {
    const grid = props.generateGrid();

    props.setGrid(grid);
  }, [props.generateGrid]);

  return (
    <svg className={styles.grid}>
      {props.grid.map((row) => (
        <g className={styles.row}>
          {row.map((node) => (
            <rect
              className={
                node.start
                  ? styles.start
                  : node.end
                  ? styles.end
                  : node.wall
                  ? styles.wall
                  : styles.node
              }
              id={node.x + " " + node.y}
              x={node.x * 30 + ""}
              y={Math.abs(810 - node.y * 30) + ""}
              width="30px"
              height="30px"
              onMouseDown={() => props.onMouseDownHandler(node)}
              onMouseOver={() => props.onMouseOverHandler(node)}
            />
          ))}
        </g>
      ))}
    </svg>
  );
};

export default Grid;
